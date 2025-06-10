// app/api/generar-imagen/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  const body = await req.json()
  const prompt = body.prompt || 'portrait of a realistic person'

  const response = await fetch('http://127.0.0.1:7860/sdapi/v1/txt2img', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt,
      steps: 15,
      width: 512,
      height: 512,
      sampler_name: "Euler a",
      cfg_scale: 7,
      override_settings: {
       sd_model_checkpoint: "v1-5-pruned-emaonly.safetensors"
      }
    }),
  })

  const data = await response.json()
  const base64Image = data.images[0]
  const buffer = Buffer.from(base64Image, 'base64')

  const filename = `imagen_${Date.now()}.jpg`
  const outputDir = path.join(process.cwd(), 'public', 'generated')
  const outputPath = path.join(outputDir, filename)

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  fs.writeFileSync(outputPath, buffer)

  return NextResponse.json({ url: `/generated/${filename}` })
}
