"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

const heroImages = [
  'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=2200&q=80'
]

const highlights = [
  'Curaduría privada para grupos, parejas y ocasiones especiales',
  'Selección premium de yates y catamaranes con servicio asistido',
  'Proceso de reservación suave, claro y con atención personalizada'
]

export default function HomePage() {
  const [hero, setHero] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setHero((p) => (p + 1) % heroImages.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <main>
      <section className="relative min-h-[88vh] overflow-hidden">
        {heroImages.map((src, i) => (
          <img key={src} src={src} alt="Yate premium" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hero === i ? 'opacity-100' : 'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(234,244,248,.28),rgba(234,244,248,.55),rgba(248,244,235,.92))]" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 py-16">
          <div className="max-w-3xl section-fade">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#5a7c93]">Private charter collection</p>
            <h1 className="mt-4 text-5xl font-black uppercase leading-[0.92] text-[#163042] md:text-7xl">Yates privados con una experiencia más elegante desde el primer contacto.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#3e6176] md:text-lg">Aurea presenta charters curados para huéspedes que buscan lujo, servicio suave y una salida impecable en Acapulco.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/reservaciones" className="rounded-full bg-[#173042] px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-white">Solicitar experiencia</Link>
              <Link href="/flotilla" className="rounded-full border border-[#6e94ac] bg-white/70 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#173042]">Ver flotilla</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item} className="soft-card section-fade rounded-[28px] p-6 text-sm leading-relaxed text-[#25465b]">{item}</article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 md:grid-cols-[1fr_1.1fr] md:items-center">
        <article className="section-fade">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7e9aae]">Experiencias privadas</p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-[0.96] text-[#173042]">Sunset charters, celebraciones y salidas a medida.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#476a80]">Diseñamos cada salida según la ocasión, el grupo y el nivel de servicio esperado. Nada se siente improvisado; todo se siente atendido.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/yates" className="rounded-full bg-[#d9c3a0] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#173042]">Explorar experiencias</Link>
          </div>
        </article>
        <article className="sand-card section-fade overflow-hidden rounded-[34px]">
          <img src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80" alt="Luxury charter" className="h-[420px] w-full object-cover" />
        </article>
      </section>
    </main>
  )
}
