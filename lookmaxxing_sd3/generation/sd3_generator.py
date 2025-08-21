from __future__ import annotations

from typing import Optional

from ..config import AppConfig


class SD3Generator:
	def __init__(self, config: AppConfig):
		self.config = config
		self._pipe = None

	def _ensure_pipe(self):
		if self._pipe is None:
			try:
				import torch
				from diffusers import AutoPipelineForText2Image
			except Exception as e:
				raise RuntimeError("SD3 dependencies not installed. Install -r requirements-sd3.txt and torch.") from e
			kwargs = {}
			if self.config.hf_token:
				kwargs["use_auth_token"] = self.config.hf_token
			self._pipe = AutoPipelineForText2Image.from_pretrained(
				self.config.model_id,
				torch_dtype=torch.float16 if self.config.device == "cuda" else torch.float32,
				variant="fp16" if self.config.device == "cuda" else None,
				**kwargs,
			)
			self._pipe = self._pipe.to(self.config.device)
			if self.config.use_xformers:
				try:
					self._pipe.enable_xformers_memory_efficient_attention()
				except Exception:
					pass
			if self.config.attn_slicing:
				self._pipe.enable_attention_slicing()
			if self.config.cpu_offload:
				self._pipe.enable_model_cpu_offload()
		return self._pipe

	def generate_image(self, prompt: str):
		pipe = self._ensure_pipe()
		image = pipe(
			prompt=prompt,
			num_inference_steps=self.config.inference_steps,
			guidance_scale=self.config.guidance_scale,
			width=self.config.image_size,
			height=self.config.image_size,
		).images[0]
		return image