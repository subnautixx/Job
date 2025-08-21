from __future__ import annotations

from typing import Literal

from ..analysis.face_analysis import FaceAnalysis


StyleType = Literal["modern", "classic", "urban"]


def build_analysis_prompt() -> str:
	return (
		"A close-up portrait of a person with clear visibility of facial features. "
		"Detailed analysis required: face shape (oval, round, square), skin tone (light, medium, dark), "
		"apparent age (20-30, 30-40), expression (neutral, smiling), eye color, and hair texture."
	)


def _style_to_desc(style: StyleType) -> str:
	mapping = {
		"modern": "modern fashion photography, trendy silhouettes, sleek minimalism",
		"classic": "classic tailoring, timeless cuts, neutral palette",
		"urban": "streetwear aesthetics, bold patterns, layered casual pieces",
	}
	return mapping.get(style, "modern fashion photography")


def build_look_prompt(analysis: FaceAnalysis, style: StyleType) -> str:
	style_desc = _style_to_desc(style)
	return (
		f"For a person with {analysis.face_shape} face shape, {analysis.skin_tone} skin tone, "
		f"aged {analysis.apparent_age}, wearing {style} outfit. {style_desc}. "
		"High detail, realistic lighting, studio shot."
	)