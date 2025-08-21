from __future__ import annotations

from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class AnalysisResult(Base):
	__tablename__ = "analysis_results"

	id = Column(Integer, primary_key=True)
	created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
	face_shape = Column(String(32), nullable=True)
	skin_tone = Column(String(32), nullable=True)
	apparent_age = Column(String(32), nullable=True)
	expression = Column(String(32), nullable=True)
	eye_color = Column(String(32), nullable=True)
	hair_texture = Column(String(32), nullable=True)
	raw_json = Column(Text, nullable=False)

	def to_dataclass(self) -> "FaceAnalysis":
		from ..analysis.face_analysis import FaceAnalysis
		return FaceAnalysis(
			face_shape=self.face_shape or "unknown",
			skin_tone=self.skin_tone or "unknown",
			apparent_age=self.apparent_age or "unknown",
			expression=self.expression or "unknown",
			eye_color=self.eye_color or "unknown",
			hair_texture=self.hair_texture or "unknown",
		)


class LookGeneration(Base):
	__tablename__ = "look_generations"

	id = Column(Integer, primary_key=True)
	created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
	analysis_id = Column(Integer, nullable=False)
	style = Column(String(32), nullable=False)
	prompt = Column(Text, nullable=False)
	image_path = Column(Text, nullable=False)