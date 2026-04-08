"use client"

import { useMemo, useState } from 'react'

type FormState = {
  nombre: string
  whatsapp: string
  email: string
  fecha: string
  personas: string
  experiencia: string
  presupuesto: string
  preferencias: string
}

type Lead = FormState & {
  id: string
  estado: string
  score: number
  origen: string
  createdAt: string
  notas: string
  timeline: string[]
}

function loadLeads() {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem('aurea_leads')
  return raw ? JSON.parse(raw) : []
}
function saveLeads(leads: Lead[]) { localStorage.setItem('aurea_leads', JSON.stringify(leads)) }

export default function ReservacionesPage() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState<FormState>({ nombre:'', whatsapp:'', email:'', fecha:'', personas:'', experiencia:'', presupuesto:'', preferencias:'' })
  const progress = useMemo(() => (step / 3) * 100, [step])

  function setField<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }))
  }

  function submit() {
    const lead: Lead = {
      ...form,
      id: 'L-' + Math.floor(Math.random() * 900 + 300),
      estado: 'nuevo',
      score: form.presupuesto.includes('100') ? 90 : 74,
      origen: 'Reservaciones Page',
      createdAt: new Date().toISOString().slice(0,16).replace('T',' '),
      notas: 'Lead ingresado desde experiencia premium.',
      timeline: ['Lead recibido']
    }
    saveLeads([lead, ...loadLeads()])
    setDone(true)
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid gap-6 md:grid-cols-[.9fr_1.1fr] md:items-start">
        <article className="section-fade">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7e9aae]">Reservaciones</p>
          <h1 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-[#173042]">Solicita una salida premium con un proceso claro y suave.</h1>
          <p className="mt-4 text-sm leading-relaxed text-[#476a80]">La idea no es llenar un formulario frío, sino recibir una solicitud con suficiente contexto para responder mejor.</p>
        </article>

        <article className="soft-card section-fade rounded-[34px] p-6">
          <div className="h-2 w-full rounded-full bg-[#dce7ed]"><div className="h-2 rounded-full bg-[#6d97b1]" style={{ width: `${done ? 100 : progress}%` }} /></div>
          {!done ? (
            <div className="mt-5 space-y-4">
              {step === 1 && <div className="grid gap-3 md:grid-cols-2"><input value={form.nombre} onChange={e=>setField('nombre',e.target.value)} placeholder="Nombre" className="rounded-2xl bg-white px-4 py-3" /><input value={form.whatsapp} onChange={e=>setField('whatsapp',e.target.value)} placeholder="WhatsApp" className="rounded-2xl bg-white px-4 py-3" /><input value={form.email} onChange={e=>setField('email',e.target.value)} placeholder="Email" className="rounded-2xl bg-white px-4 py-3 md:col-span-2" /></div>}
              {step === 2 && <div className="grid gap-3 md:grid-cols-2"><input type="date" value={form.fecha} onChange={e=>setField('fecha',e.target.value)} className="rounded-2xl bg-white px-4 py-3" /><input value={form.personas} onChange={e=>setField('personas',e.target.value)} placeholder="Número de personas" className="rounded-2xl bg-white px-4 py-3" /><input value={form.experiencia} onChange={e=>setField('experiencia',e.target.value)} placeholder="Tipo de experiencia" className="rounded-2xl bg-white px-4 py-3" /><input value={form.presupuesto} onChange={e=>setField('presupuesto',e.target.value)} placeholder="Presupuesto" className="rounded-2xl bg-white px-4 py-3" /></div>}
              {step === 3 && <div className="grid gap-3"><textarea value={form.preferencias} onChange={e=>setField('preferencias',e.target.value)} placeholder="Preferencias adicionales" className="min-h-32 rounded-2xl bg-white px-4 py-3" /></div>}
              <div className="flex gap-2">{step>1 && <button onClick={()=>setStep(step-1)} className="rounded-full border border-[#7d99ad] px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#173042]">Atrás</button>}{step<3 ? <button onClick={()=>setStep(step+1)} className="rounded-full bg-[#173042] px-5 py-2 text-xs font-black uppercase tracking-[0.14em] text-white">Siguiente</button> : <button onClick={submit} className="rounded-full bg-[#173042] px-5 py-2 text-xs font-black uppercase tracking-[0.14em] text-white">Enviar solicitud</button>}</div>
            </div>
          ) : (
            <div className="mt-6 rounded-[24px] bg-[#f8f4eb] p-5"><p className="text-2xl font-semibold text-[#173042]">Solicitud recibida.</p><p className="mt-3 text-sm text-[#476a80]">Te contactaremos con disponibilidad y propuesta curada según el tipo de experiencia que buscas.</p></div>
          )}
        </article>
      </div>
    </main>
  )
}
