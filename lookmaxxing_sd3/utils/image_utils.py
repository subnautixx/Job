from __future__ import annotations

import cv2
import numpy as np
from PIL import Image


def read_bgr(path: str):
	img = cv2.imread(path, cv2.IMREAD_COLOR)
	if img is None:
		raise ValueError(f"Failed to read image: {path}")
	return img


def bgr_to_rgb(img_bgr):
	return cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)


def cv2_to_pil(img_bgr) -> Image.Image:
	rgb = bgr_to_rgb(img_bgr)
	return Image.fromarray(rgb)


def center_crop_to_square(img_bgr):
	h, w = img_bgr.shape[:2]
	sz = min(h, w)
	y0 = (h - sz) // 2
	x0 = (w - sz) // 2
	return img_bgr[y0:y0 + sz, x0:x0 + sz]