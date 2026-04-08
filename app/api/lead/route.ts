import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nombre, telefono, mensaje } = body || {}

    if (!nombre || !telefono || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    return NextResponse.json({
      ok: true,
      lead: {
        nombre,
        telefono,
        mensaje,
        source: 'jars-acapulco-web'
      }
    })
  } catch {
    return NextResponse.json({ error: 'Payload inválido' }, { status: 400 })
  }
}
