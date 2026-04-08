"use client"

import { useMemo, useState } from 'react'

type Lead = {
  id: string
  nombre: string
  whatsapp: string
  email: string
  fecha: string
  personas: string
  experiencia: string
  duracion: string
  presupuesto: string
  ocasion: string
  idioma: string
  preferencias: string
  urgencia: string
  canal: string
  estado: string
  score: number
  origen: string
  createdAt: string
  notas: string
  timeline: string[]
}

const ESTADOS = ['nuevo','preclasificado','contacto realizado','cotización enviada','seguimiento','cerrado ganado','cerrado perdido']

function getLeads(): Lead[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem('aurea_leads')
  return raw ? JSON.parse(raw) : []
}
function saveLeads(leads: Lead[]) { localStorage.setItem('aurea_leads', JSON.stringify(leads)) }

export default function OpsPage() {
  const [leads, setLeads] = useState<Lead[]>(getLeads())
  const [selected, setSelected] = useState<Lead | null>(leads[0] || null)

  const pipeline = useMemo(()=> ESTADOS.map(e=>({estado:e,count:leads.filter(l=>l.estado===e).length})),[leads])

  function changeStatus(id:string, estado:string){
    const next = leads.map(l=> l.id===id ? {...l, estado, timeline:[...l.timeline,`Estado cambiado a ${estado}`]} : l)
    setLeads(next); saveLeads(next); setSelected(next.find(l=>l.id===id)||null)
  }

  return (
    <main className="min-h-screen bg-[#070b12] text-[#efe9df] p-6">
      <h1 className="text-3xl font-black uppercase">Aurea Ops / Recepción</h1>
      <p className="mt-2 text-sm text-[#c7d0d8]">Objetivo de respuesta: 12-20 min · Prioridad por score y urgencia</p>

      <section className="mt-6 grid gap-3 md:grid-cols-4">
        {pipeline.map(p=> <article key={p.estado} className="lux-panel rounded-xl p-4"><p className="text-xs uppercase text-[#8fb5c3]">{p.estado}</p><p className="mt-2 text-2xl font-black">{p.count}</p></article>)}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-[1.2fr_.8fr]">
        <article className="lux-panel rounded-2xl p-4">
          <h2 className="font-bold uppercase">Leads</h2>
          <div className="mt-3 space-y-2">
            {leads.map(l=> (
              <button key={l.id} onClick={()=>setSelected(l)} className="w-full rounded-lg border border-white/10 bg-[#101a29] p-3 text-left">
                <div className="flex items-center justify-between"><p className="font-semibold">{l.nombre}</p><p className="text-xs">Score {l.score}</p></div>
                <p className="text-xs text-[#c8d1d8]">{l.experiencia} · {l.presupuesto} · {l.estado}</p>
              </button>
            ))}
          </div>
        </article>

        <article className="lux-panel rounded-2xl p-4">
          {selected ? (
            <>
              <h2 className="font-bold uppercase">Ficha {selected.id}</h2>
              <div className="mt-3 space-y-1 text-sm text-[#d3dce2]">
                <p><b>Nombre:</b> {selected.nombre}</p>
                <p><b>Contacto:</b> {selected.whatsapp} · {selected.email}</p>
                <p><b>Origen:</b> {selected.origen} · {selected.createdAt}</p>
                <p><b>Experiencia:</b> {selected.experiencia}</p>
                <p><b>Presupuesto:</b> {selected.presupuesto}</p>
                <p><b>Urgencia:</b> {selected.urgencia}</p>
                <p><b>Idioma:</b> {selected.idioma}</p>
              </div>
              <div className="mt-3">
                <p className="text-xs uppercase text-[#9fc0cd]">Cambiar estatus</p>
                <select className="mt-2 w-full rounded bg-[#0f1e2f] p-2" value={selected.estado} onChange={e=>changeStatus(selected.id,e.target.value)}>
                  {ESTADOS.map(e=><option key={e}>{e}</option>)}
                </select>
              </div>
              <div className="mt-3">
                <p className="text-xs uppercase text-[#9fc0cd]">Siguiente acción sugerida</p>
                <p className="mt-1 text-sm">Enviar propuesta curada con 2 opciones de embarcación y disponibilidad prioritaria.</p>
              </div>
              <div className="mt-3">
                <p className="text-xs uppercase text-[#9fc0cd]">Timeline</p>
                <ul className="mt-1 space-y-1 text-sm">{selected.timeline.map((t,i)=><li key={i}>• {t}</li>)}</ul>
              </div>
            </>
          ) : <p>Sin leads.</p>}
        </article>
      </section>
    </main>
  )
}
