# LookMaxxing SD3

Sistema de análise facial e geração de looks virtuais com Stable Diffusion 3.

## Visão Geral
- Analisa uma imagem facial e extrai características: formato do rosto, tom de pele, idade aparente, expressão, cor dos olhos e textura do cabelo
- Gera recomendações de moda e imagens de looks usando SD3 com filtros de estilo (moderno, clássico, urbano)
- API Flask com persistência em SQLite

## Estrutura
```
lookmaxxing_sd3/
  app.py
  config.py
  analysis/face_analysis.py
  generation/sd3_generator.py
  prompts/prompt_builder.py
  db/__init__.py
  db/models.py
  utils/image_utils.py
outputs/
examples/
```

## Requisitos
- GPU com VRAM ≥ 8 GB (recomendado)
- Drivers CUDA e PyTorch com suporte a CUDA
- Conta no Hugging Face (alguns modelos SD3 requerem aceite de licença)

## Instalação
```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

Opcional: login no Hugging Face para acessar SD3 caso necessário
```bash
python -m huggingface_hub login --token YOUR_HF_TOKEN
```

## Execução da API
```bash
export FLASK_APP=lookmaxxing_sd3/app.py
export HF_TOKEN=YOUR_HF_TOKEN  # se necessário para SD3
flask run --host 0.0.0.0 --port 8000
```

## Endpoints
- POST `/api/analyze` (multipart/form-data `image`) → retorna JSON com análise
- POST `/api/generate-looks` (multipart/form-data `image` opcional, `styles`=["modern"|"classic"|"urban"]) → retorna análise + imagens base64 e prompts

## Privacidade
- A imagem enviada é processada em memória e removida após o término
- Apenas características extraídas e caminhos para imagens geradas são persistidos (configurável)

## Exemplos
Veja a pasta `examples/` para JSON de saída de exemplo e imagens geradas.

## Licenças
Somente bibliotecas open-source são utilizadas. Verifique as licenças dos modelos SD3 no Hugging Face.