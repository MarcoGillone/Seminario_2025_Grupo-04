// app/api/generar-imagen/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  const body = await req.json();

  const {
    prompt,
    width = 512,
    height = 512,
    steps = 20,
    cfg_scale = 7,
    sampler = "Euler",
    model,
  } = body;

  // 🔁 Cambiar el modelo si se solicita (solo si usás AUTOMATIC1111)
  if (model) {
    await fetch("http://127.0.0.1:7860/sdapi/v1/options", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sd_model_checkpoint: model }),
    });
  }

  const response = await fetch('http://127.0.0.1:7860/sdapi/v1/txt2img', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      steps,
      cfg_scale,
      sampler_name: sampler,
      width,
      height,
    }),
  });

  const data = await response.json();
  const imageBase64 = data.images[0];

  // 🖼️ Guardar imagen como archivo temporal
  const filename = `imagen_${Date.now()}.png`;
  const filepath = path.join(process.cwd(), 'public', filename);
  fs.writeFileSync(filepath, Buffer.from(imageBase64, 'base64'));

  return NextResponse.json({ url: `/${filename}` });
}
