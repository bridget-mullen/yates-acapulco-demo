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

const STATUSES = ['nuevo', 'preclasificado', 'contacto realizado', 'cotización enviada', 'seguimiento', 'cerrado ganado', 'cerrado perdido']

const FALLBACK: Lead[] = [
  { id:'L-201', nombre:'Andrea Lozano', whatsapp:'+52 55 2188 4411', email:'andrea@novagroup.mx', fecha:'2026-04-19', personas:'14', experiencia:'Corporativo VIP', duracion:'6h', presupuesto:'$90k-$130k', ocasion:'Cierre anual', idioma:'Español/English', preferencias:'DJ lounge + catering premium', urgencia:'Alta', canal:'WhatsApp', estado:'cotización enviada', score:88, origen:'Hero CTA', createdAt:'2026-04-07 13:10', notas:'Lead con intención clara y timing favorable.', timeline:['Lead recibido','Preclasificado','Contacto 12 min','Cotización enviada'] },
  { id:'L-202', nombre:'Michael Reed', whatsapp:'+1 305 554 0022', email:'mreed@orionpartners.com', fecha:'2026-04-22', personas:'8', experiencia:'Experiencia romántica', duracion:'4h', presupuesto:'$55k-$80k', ocasion:'Aniversario', idioma:'English', preferencias:'Atardecer + champagne', urgencia:'Media', canal:'Email', estado:'contacto realizado', score:73, origen:'AI Concierge', createdAt:'2026-04-07 15:42', notas:'Pendiente ventana final de disponibilidad.', timeline:['Lead recibido','Preclasificado','Contacto realizado'] },
  { id:'L-203', nombre:'Luis Mendoza', whatsapp:'+52 33 5555 8822', email:'luis@privatecapital.mx', fecha:'2026-04-25', personas:'18', experiencia:'Day Charter Privado', duracion:'8h', presupuesto:'$100k+', ocasion:'Hospitality para inversionistas', idioma:'Español', preferencias:'Chef privado + branding discreto', urgencia:'Alta', canal:'Llamada', estado:'preclasificado', score:94, origen:'Formulario Multi-step', createdAt:'2026-04-08 04:51', notas:'Prioridad alta por ticket y urgencia.', timeline:['Lead recibido','Score alto detectado','Pendiente llamada concierge'] }
]

function loadLeads(): Lead[] {
  if (typeof window === 'undefined') return FALLBACK
  const raw = localStorage.getItem('aurea_leads')
  if (!raw) {
    localStorage.setItem('aurea_leads', JSON.stringify(FALLBACK))
    return FALLBACK
  }
  return JSON.parse(raw)
}

function saveLeads(leads: Lead[]) {
  localStorage.setItem('aurea_leads', JSON.stringify(leads))
}

export default function OpsPage() {
  const [leads, setLeads] = useState<Lead[]>(loadLeads())
  const [selectedId, setSelectedId] = useState<string>(loadLeads()[0]?.id || '')

  const selected = useMemo(() => leads.find((l) => l.id === selectedId) || leads[0], [leads, selectedId])
  const grouped = useMemo(() => STATUSES.map((status) => ({ status, items: leads.filter((l) => l.estado === status) })), [leads])

  function changeStatus(id: string, status: string) {
    const next = leads.map((lead) =>
      lead.id === id
        ? { ...lead, estado: status, timeline: [...lead.timeline, `Estado actualizado a ${status}`] }
        : lead
    )
    setLeads(next)
    saveLeads(next)
  }

  return (
    <main className="min-h-screen bg-[#09070a] text-[#f5efe8]">
      <section className="border-b border-white/10 bg-[linear-gradient(180deg,#171116,#0e0b0f)] px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#d7c19b]">Aurea Ops</p>
          <h1 className="mt-2 text-4xl font-black uppercase text-[#f7eedf]">Recepción operativa</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#d5cdc4]">Una vista clara para priorizar leads, mover estatus y sostener una operación comercial premium sin parecer software frío.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-7">
          {grouped.map((group) => (
            <article key={group.status} className="rounded-[24px] border border-[#4a3834] bg-[#171116] p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#d7c19b]">{group.status}</p>
              <p className="mt-2 text-3xl font-black text-[#f7eedf]">{group.items.length}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-4 xl:grid-cols-[1.12fr_.88fr]">
          <article className="rounded-[34px] border border-[#3c2d30] bg-[#120d12] p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#d7c19b]">Pipeline</p>
                <h2 className="mt-2 text-2xl font-black uppercase text-[#f7eedf]">Leads en seguimiento</h2>
              </div>
              <p className="text-xs text-[#cdbda9]">Atención prioritaria</p>
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-2">
              {grouped.map((group) => (
                <section key={group.status} className="rounded-[26px] border border-[#3d3032] bg-[#191217] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d7c19b]">{group.status}</p>
                  <div className="mt-3 space-y-2">
                    {group.items.length ? group.items.map((lead) => (
                      <button key={lead.id} onClick={() => setSelectedId(lead.id)} className={`w-full rounded-[22px] border p-3 text-left ${selected?.id === lead.id ? 'border-[#d4b07c] bg-[#241b22]' : 'border-[#34282b] bg-[#151015]'}`}>
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-[#f6eddf]">{lead.nombre}</p>
                          <p className="text-[11px] uppercase tracking-[0.08em] text-[#efc98f]">Score {lead.score}</p>
                        </div>
                        <p className="mt-1 text-xs text-[#d4cbc2]">{lead.experiencia} · {lead.presupuesto}</p>
                      </button>
                    )) : <p className="text-xs text-[#8b7f78]">Sin leads en este estado.</p>}
                  </div>
                </section>
              ))}
            </div>
          </article>

          <article className="rounded-[34px] border border-[#5b4836] bg-[linear-gradient(180deg,#171116,#0f0b10)] p-5">
            {selected ? (
              <>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#d7c19b]">Ficha de lead</p>
                <h2 className="mt-2 text-3xl font-black uppercase text-[#f7eedf]">{selected.nombre}</h2>
                <div className="mt-4 grid gap-2 text-sm text-[#ddd4cb]">
                  <p><strong>Lead ID:</strong> {selected.id}</p>
                  <p><strong>Origen:</strong> {selected.origen}</p>
                  <p><strong>Entrada:</strong> {selected.createdAt}</p>
                  <p><strong>Experiencia:</strong> {selected.experiencia}</p>
                  <p><strong>Presupuesto:</strong> {selected.presupuesto}</p>
                  <p><strong>Urgencia:</strong> {selected.urgencia}</p>
                  <p><strong>Idioma:</strong> {selected.idioma}</p>
                  <p><strong>Grupo:</strong> {selected.personas} personas · {selected.duracion}</p>
                  <p><strong>Contacto:</strong> {selected.whatsapp} · {selected.email}</p>
                </div>

                <div className="mt-5 rounded-[24px] border border-[#3b2d30] bg-[#1a1318] p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#d7c19b]">Siguiente acción sugerida</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#e2d8ce]">Enviar propuesta curada con 2 opciones de embarcación, rango final y ventana de respuesta prioritaria.</p>
                </div>

                <div className="mt-5">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#d7c19b]">Mover estatus</p>
                  <select className="mt-2 w-full rounded-[20px] bg-[#1b151a] px-4 py-3 text-[#f6eddf]" value={selected.estado} onChange={(e) => changeStatus(selected.id, e.target.value)}>
                    {STATUSES.map((status) => <option key={status}>{status}</option>)}
                  </select>
                </div>

                <div className="mt-5 rounded-[24px] border border-[#3b2d30] bg-[#1a1318] p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#d7c19b]">Notas internas</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#e2d8ce]">{selected.notas}</p>
                </div>

                <div className="mt-5 rounded-[24px] border border-[#3b2d30] bg-[#1a1318] p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#d7c19b]">Timeline</p>
                  <ul className="mt-3 space-y-2 text-sm text-[#e2d8ce]">
                    {selected.timeline.map((item, index) => <li key={index}>• {item}</li>)}
                  </ul>
                </div>
              </>
            ) : (
              <p className="text-sm text-[#d4cbc2]">No hay leads disponibles.</p>
            )}
          </article>
        </div>
      </section>
    </main>
  )
}
