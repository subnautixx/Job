from __future__ import annotations

import cv2
import numpy as np
from pydantic import BaseModel

from ..utils.image_utils import read_bgr


class FaceAnalysis(BaseModel):
	face_shape: str
	skin_tone: str
	apparent_age: str
	expression: str
	eye_color: str
	hair_texture: str


_haar = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")


def _classify_face_shape(face_roi: np.ndarray) -> str:
	h, w = face_roi.shape[:2]
	ratio = w / max(h, 1)
	if ratio < 0.75:
		return "oval"
	elif ratio < 0.9:
		return "round"
	else:
		return "square"


def _classify_skin_tone(face_roi: np.ndarray) -> str:
	lab = cv2.cvtColor(face_roi, cv2.COLOR_BGR2LAB)
	L = lab[:, :, 0].astype(np.float32)
	mean_L = float(np.mean(L))
	if mean_L >= 180:
		return "light"
	elif mean_L >= 130:
		return "medium"
	else:
		return "dark"


def _estimate_age_bucket(face_roi: np.ndarray) -> str:
	gray = cv2.cvtColor(face_roi, cv2.COLOR_BGR2GRAY)
	var = float(cv2.Laplacian(gray, cv2.CV_64F).var())
	if var < 120.0:
		return "20-30"
	elif var < 200.0:
		return "30-40"
	else:
		return "40-50"


def _classify_expression(face_roi: np.ndarray) -> str:
	h = face_roi.shape[0]
	lower = face_roi[int(0.65 * h):, :]
	gray = cv2.cvtColor(lower, cv2.COLOR_BGR2GRAY)
	edge = cv2.Canny(gray, 50, 150)
	edge_density = edge.mean()
	return "smiling" if edge_density > 25 else "neutral"


def _classify_eye_color(face_roi: np.ndarray) -> str:
	h, w = face_roi.shape[:2]
	stripe = face_roi[int(0.35 * h):int(0.5 * h), :]
	rgb = cv2.cvtColor(stripe, cv2.COLOR_BGR2RGB)
	mean = rgb.reshape(-1, 3).mean(axis=0)
	r, g, b = mean
	if b > 120 and g > 120 and r < 130:
		return "green"
	elif b > r and b > g:
		return "blue"
	else:
		return "brown"


def _classify_hair_texture(img_bgr: np.ndarray, face_bbox: tuple[int, int, int, int]) -> str:
	x, y, w, h = face_bbox
	y0 = max(y - int(0.4 * h), 0)
	x0 = x
	y1 = max(y, 0)
	x1 = x + w
	strip = img_bgr[y0:y1, x0:x1]
	if strip.size == 0:
		return "unknown"
	gray = cv2.cvtColor(strip, cv2.COLOR_BGR2GRAY)
	var = float(cv2.Laplacian(gray, cv2.CV_64F).var())
	if var < 150.0:
		return "straight"
	elif var < 300.0:
		return "wavy"
	else:
		return "curly"


def analyze_face(image_path: str) -> FaceAnalysis:
	img = read_bgr(image_path)
	gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	faces = _haar.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(80, 80))
	if len(faces) == 0:
		return FaceAnalysis(
			face_shape="unknown",
			skin_tone="unknown",
			apparent_age="unknown",
			expression="neutral",
			eye_color="unknown",
			hair_texture="unknown",
		)
	x, y, w, h = faces[0]
	face_roi = img[y:y + h, x:x + w].copy()
	if face_roi.size == 0:
		face_roi = img.copy()

	face_shape = _classify_face_shape(face_roi)
	skin_tone = _classify_skin_tone(face_roi)
	apparent_age = _estimate_age_bucket(face_roi)
	expression = _classify_expression(face_roi)
	eye_color = _classify_eye_color(face_roi)
	hair_texture = _classify_hair_texture(img, (x, y, w, h))

	return FaceAnalysis(
		face_shape=face_shape,
		skin_tone=skin_tone,
		apparent_age=apparent_age,
		expression=expression,
		eye_color=eye_color,
		hair_texture=hair_texture,
	)