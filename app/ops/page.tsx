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
  presupuesto: string
  estado: string
  score: number
  origen: string
  createdAt: string
  notas: string
  timeline: string[]
}

const statuses = ['nuevo', 'preclasificado', 'contacto realizado', 'cotización enviada', 'seguimiento', 'cerrado ganado', 'cerrado perdido']
const fallback: Lead[] = [
  { id:'L-201', nombre:'Andrea Lozano', whatsapp:'+52 55 2188 4411', email:'andrea@novagroup.mx', fecha:'2026-04-19', personas:'14', experiencia:'Corporativo VIP', presupuesto:'$90k-$130k', estado:'cotización enviada', score:88, origen:'Hero CTA', createdAt:'2026-04-07 13:10', notas:'Lead con intención clara y timing favorable.', timeline:['Lead recibido','Preclasificado','Contacto 12 min','Cotización enviada'] },
  { id:'L-202', nombre:'Michael Reed', whatsapp:'+1 305 554 0022', email:'mreed@orionpartners.com', fecha:'2026-04-22', personas:'8', experiencia:'Experiencia romántica', presupuesto:'$55k-$80k', estado:'contacto realizado', score:73, origen:'AI Concierge', createdAt:'2026-04-07 15:42', notas:'Pendiente ventana final de disponibilidad.', timeline:['Lead recibido','Preclasificado','Contacto realizado'] }
]
function loadLeads() {
  if (typeof window === 'undefined') return fallback
  const raw = localStorage.getItem('aurea_leads')
  if (!raw) return fallback
  return JSON.parse(raw)
}
function saveLeads(leads: Lead[]) { localStorage.setItem('aurea_leads', JSON.stringify(leads)) }

export default function OpsPage() {
  const [leads, setLeads] = useState<Lead[]>(loadLeads())
  const [selectedId, setSelectedId] = useState<string>(loadLeads()[0]?.id || '')
  const selected = useMemo(() => leads.find((l) => l.id === selectedId) || leads[0], [leads, selectedId])
  const grouped = useMemo(() => statuses.map((s) => ({ status: s, items: leads.filter((l) => l.estado === s) })), [leads])

  function changeStatus(id: string, status: string) {
    const next = leads.map((lead) => lead.id === id ? { ...lead, estado: status, timeline: [...lead.timeline, `Estado actualizado a ${status}`] } : lead)
    setLeads(next)
    saveLeads(next)
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-14">
      <div className="max-w-3xl section-fade">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7e9aae]">Ops</p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-[#173042]">Recepción operativa con una presentación más premium y ligera.</h1>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-4 xl:grid-cols-7">
        {grouped.map((group) => (
          <article key={group.status} className="soft-card rounded-[24px] p-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#7e9aae]">{group.status}</p>
            <p className="mt-2 text-3xl font-black text-[#173042]">{group.items.length}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-[1.08fr_.92fr]">
        <article className="sand-card rounded-[32px] p-5">
          <h2 className="text-2xl font-black uppercase text-[#173042]">Pipeline</h2>
          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            {grouped.map((group) => (
              <section key={group.status} className="rounded-[24px] bg-white/70 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7e9aae]">{group.status}</p>
                <div className="mt-3 space-y-2">
                  {group.items.length ? group.items.map((lead) => (
                    <button key={lead.id} onClick={() => setSelectedId(lead.id)} className={`w-full rounded-[20px] border p-3 text-left ${selected?.id === lead.id ? 'border-[#d6bd97] bg-[#fff7ea]' : 'border-[#d4e0e7] bg-white'}`}>
                      <div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold text-[#173042]">{lead.nombre}</p><p className="text-[11px] uppercase tracking-[0.08em] text-[#7e9aae]">Score {lead.score}</p></div>
                      <p className="mt-1 text-xs text-[#4c7187]">{lead.experiencia} · {lead.presupuesto}</p>
                    </button>
                  )) : <p className="text-xs text-[#7f96a3]">Sin leads.</p>}
                </div>
              </section>
            ))}
          </div>
        </article>

        <article className="soft-card rounded-[32px] p-5">
          {selected ? (
            <>
              <h2 className="text-2xl font-black uppercase text-[#173042]">{selected.nombre}</h2>
              <div className="mt-4 grid gap-2 text-sm text-[#476a80]">
                <p><strong>Lead ID:</strong> {selected.id}</p>
                <p><strong>Origen:</strong> {selected.origen}</p>
                <p><strong>Entrada:</strong> {selected.createdAt}</p>
                <p><strong>Experiencia:</strong> {selected.experiencia}</p>
                <p><strong>Presupuesto:</strong> {selected.presupuesto}</p>
                <p><strong>Grupo:</strong> {selected.personas} personas</p>
                <p><strong>Contacto:</strong> {selected.whatsapp} · {selected.email}</p>
              </div>
              <div className="mt-5 rounded-[22px] bg-[#f8f4eb] p-4"><p className="text-[11px] uppercase tracking-[0.16em] text-[#7e9aae]">Siguiente acción sugerida</p><p className="mt-2 text-sm text-[#476a80]">Enviar propuesta curada con dos opciones y disponibilidad prioritaria.</p></div>
              <div className="mt-5"><p className="text-[11px] uppercase tracking-[0.16em] text-[#7e9aae]">Mover estatus</p><select className="mt-2 w-full rounded-[18px] bg-white px-4 py-3 text-[#173042]" value={selected.estado} onChange={(e) => changeStatus(selected.id, e.target.value)}>{statuses.map((s) => <option key={s}>{s}</option>)}</select></div>
              <div className="mt-5 rounded-[22px] bg-[#f8f4eb] p-4"><p className="text-[11px] uppercase tracking-[0.16em] text-[#7e9aae]">Notas</p><p className="mt-2 text-sm text-[#476a80]">{selected.notas}</p></div>
            </>
          ) : <p>Sin lead seleccionado.</p>}
        </article>
      </div>
    </main>
  )
}
