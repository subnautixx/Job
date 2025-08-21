import os
from dataclasses import dataclass


@dataclass
class AppConfig:
	model_id: str = os.getenv("SD3_MODEL_ID", "stabilityai/stable-diffusion-3-medium-diffusers")
	hf_token: str | None = os.getenv("HF_TOKEN")
	device: str = os.getenv("DEVICE", "cuda")
	use_xformers: bool = os.getenv("USE_XFORMERS", "1") == "1"
	attn_slicing: bool = os.getenv("ATTN_SLICING", "1") == "1"
	cpu_offload: bool = os.getenv("CPU_OFFLOAD", "0") == "1"
	inference_steps: int = int(os.getenv("INFERENCE_STEPS", "28"))
	guidance_scale: float = float(os.getenv("GUIDANCE_SCALE", "3.0"))
	image_size: int = int(os.getenv("IMAGE_SIZE", "768"))