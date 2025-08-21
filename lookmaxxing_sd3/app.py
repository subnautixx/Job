import base64
import io
import os
import tempfile
from datetime import datetime
from typing import List, Optional

from flask import Flask, jsonify, request
from PIL import Image

from .config import AppConfig
from .db import get_session, init_db
from .db.models import AnalysisResult, LookGeneration
from .analysis.face_analysis import analyze_face
from .prompts.prompt_builder import build_look_prompt


def create_app() -> Flask:
	app = Flask(__name__)
	app.config.from_mapping({
		"MAX_CONTENT_LENGTH": 20 * 1024 * 1024,
	})
	init_db()
	generator = None
	config = AppConfig()

	@app.post("/api/analyze")
	def api_analyze():
		if "image" not in request.files:
			return jsonify({"error": "missing image"}), 400
		file = request.files["image"]
		with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp:
			file.save(tmp.name)
			tmp_path = tmp.name
		try:
			analysis = analyze_face(tmp_path)
		finally:
			try:
				os.remove(tmp_path)
			except OSError:
				pass

		with get_session() as session:
			row = AnalysisResult(
				created_at=datetime.utcnow(),
				face_shape=analysis.face_shape,
				skin_tone=analysis.skin_tone,
				apparent_age=analysis.apparent_age,
				expression=analysis.expression,
				eye_color=analysis.eye_color,
				hair_texture=analysis.hair_texture,
				raw_json=analysis.model_dump_json()
			)
			session.add(row)
			session.commit()
			analysis_id = row.id

		return jsonify({"analysis_id": analysis_id, **analysis.model_dump()}), 200

	@app.post("/api/generate-looks")
	def api_generate_looks():
		nonlocal generator
		styles: List[str] = []
		styles_param = request.form.get("styles") or request.form.get("style")
		if styles_param:
			styles = [s.strip().lower() for s in styles_param.split(",") if s.strip()]
		else:
			styles = ["modern"]

		analysis_id: Optional[int] = None
		analysis = None

		if "image" in request.files:
			file = request.files["image"]
			with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp:
				file.save(tmp.name)
				tmp_path = tmp.name
			try:
				analysis = analyze_face(tmp_path)
			finally:
				try:
					os.remove(tmp_path)
				except OSError:
					pass
			with get_session() as session:
				row = AnalysisResult(
					created_at=datetime.utcnow(),
					face_shape=analysis.face_shape,
					skin_tone=analysis.skin_tone,
					apparent_age=analysis.apparent_age,
					expression=analysis.expression,
					eye_color=analysis.eye_color,
					hair_texture=analysis.hair_texture,
					raw_json=analysis.model_dump_json()
				)
				session.add(row)
				session.commit()
				analysis_id = row.id
		else:
			analysis_id_str = request.form.get("analysis_id")
			if not analysis_id_str:
				return jsonify({"error": "provide image or analysis_id"}), 400
			analysis_id = int(analysis_id_str)
			from sqlalchemy import select
			with get_session() as session:
				row = session.execute(select(AnalysisResult).where(AnalysisResult.id == analysis_id)).scalar_one_or_none()
				if row is None:
					return jsonify({"error": "analysis_id not found"}), 404
				analysis = row.to_dataclass()

		if generator is None:
			from .generation.sd3_generator import SD3Generator
			generator = SD3Generator(config)

		results = []
		for style in styles:
			prompt = build_look_prompt(analysis, style)
			try:
				image: Image.Image = generator.generate_image(prompt)
			except Exception as e:
				return jsonify({"error": str(e)}), 500
			buf = io.BytesIO()
			image.save(buf, format="PNG")
			img_b64 = base64.b64encode(buf.getvalue()).decode("utf-8")

			output_dir = os.path.join(os.getcwd(), "outputs")
			os.makedirs(output_dir, exist_ok=True)
			filename = f"look_{analysis_id}_{style}_{int(datetime.utcnow().timestamp())}.png"
			file_path = os.path.join(output_dir, filename)
			image.save(file_path)

			with get_session() as session:
				row = LookGeneration(
					analysis_id=analysis_id,
					created_at=datetime.utcnow(),
					style=style,
					prompt=prompt,
					image_path=file_path,
				)
				session.add(row)
				session.commit()

			results.append({
				"style": style,
				"prompt": prompt,
				"image_base64": img_b64,
				"image_path": file_path
			})

		return jsonify({
			"analysis_id": analysis_id,
			"analysis": analysis.model_dump(),
			"results": results
		}), 200

	@app.get("/api/health")
	def api_health():
		return jsonify({"status": "ok"})

	return app


app = create_app()