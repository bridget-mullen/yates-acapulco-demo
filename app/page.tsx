"use client"

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

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

const HERO = [
  'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=2200&q=80'
]

const EXPERIENCIAS = ['Sunset Charter', 'Day Charter Privado', 'Celebración a bordo', 'Experiencia romántica', 'Corporativo VIP', 'Experiencia a medida']
const FLEET = [
  { name: 'Yate Deportivo 42’', cap: 'Hasta 10 personas', style: 'Escapes rápidos premium', from: 'Desde $29,000 MXN' },
  { name: 'Yate Premium 55’', cap: 'Hasta 15 personas', style: 'Celebraciones de alto nivel', from: 'Desde $52,000 MXN' },
  { name: 'Catamarán Privado 60’', cap: 'Hasta 20 personas', style: 'Confort panorámico', from: 'Desde $68,000 MXN' },
  { name: 'Luxury Extended 75’', cap: 'Hasta 30 personas', style: 'Hospitality full service', from: 'Desde $110,000 MXN' }
]

const FAQ = [
  ['¿Cómo funciona la reserva?', 'Compartes tu solicitud, el equipo valida disponibilidad y te envía propuesta curada.'],
  ['¿Qué incluye la experiencia?', 'Depende de la embarcación: tripulación, ruta, amenidades y opciones de personalización.'],
  ['¿Con cuánto tiempo reservar?', 'Idealmente 3-7 días antes. Fechas premium requieren mayor anticipación.'],
  ['¿Qué pasa si cambia el clima?', 'Se ajusta horario/ruta o se reprograma según condiciones seguras de navegación.']
]

const seedLeads: Lead[] = [
  { id:'L-201', nombre:'Andrea Lozano', whatsapp:'+52 55 2188 4411', email:'andrea@novagroup.mx', fecha:'2026-04-19', personas:'14', experiencia:'Corporativo VIP', duracion:'6h', presupuesto:'$90k-$130k', ocasion:'Cierre anual', idioma:'Español/English', preferencias:'DJ lounge + catering premium', urgencia:'Alta', canal:'WhatsApp', estado:'cotización enviada', score:88, origen:'Web Hero CTA', createdAt:'2026-04-07 13:10', notas:'Alta probabilidad', timeline:['Lead recibido','Preclasificado','Contacto 12 min','Cotización enviada']},
  { id:'L-202', nombre:'Michael Reed', whatsapp:'+1 305 554 0022', email:'mreed@orionpartners.com', fecha:'2026-04-22', personas:'8', experiencia:'Experiencia romántica', duracion:'4h', presupuesto:'$55k-$80k', ocasion:'Aniversario', idioma:'English', preferencias:'Atardecer + champagne', urgencia:'Media', canal:'Email', estado:'contacto realizado', score:73, origen:'AI Concierge', createdAt:'2026-04-07 15:42', notas:'Necesita confirmación fecha', timeline:['Lead recibido','Preclasificado','Contacto realizado']}
]

function getLeads(): Lead[] {
  if (typeof window === 'undefined') return seedLeads
  const raw = localStorage.getItem('aurea_leads')
  if (!raw) {
    localStorage.setItem('aurea_leads', JSON.stringify(seedLeads))
    return seedLeads
  }
  return JSON.parse(raw)
}

function saveLeads(leads: Lead[]) {
  localStorage.setItem('aurea_leads', JSON.stringify(leads))
}

export default function Page() {
  const [hero, setHero] = useState(0)
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [conciergeOpen, setConciergeOpen] = useState(false)
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    const id = setInterval(() => setHero((p) => (p + 1) % HERO.length), 3000)
    getLeads()
    return () => clearInterval(id)
  }, [])

  const progress = useMemo(() => Math.min(100, (step / 4) * 100), [step])

  const setField = (k: string, v: string) => setForm((f: any) => ({ ...f, [k]: v }))

  function submit() {
    const lead: Lead = {
      id: 'L-' + Math.floor(Math.random() * 900 + 300),
      nombre: form.nombre || 'Sin nombre', whatsapp: form.whatsapp || '', email: form.email || '', fecha: form.fecha || '', personas: form.personas || '',
      experiencia: form.experiencia || '', duracion: form.duracion || '', presupuesto: form.presupuesto || '', ocasion: form.ocasion || '', idioma: form.idioma || '', preferencias: form.preferencias || '', urgencia: form.urgencia || 'Media', canal: form.canal || 'WhatsApp', estado: 'nuevo', score: form.presupuesto?.includes('100') ? 90 : 72,
      origen: 'Formulario Multi-step', createdAt: new Date().toISOString().slice(0,16).replace('T',' '), notas: 'Nuevo lead ingresado', timeline: ['Lead recibido']
    }
    const leads = getLeads()
    saveLeads([lead, ...leads])
    setDone(true)
  }

  return (
    <main>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#070c14]/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="text-lg font-black uppercase tracking-[0.16em]">Aurea Yachts</div>
          <div className="hidden gap-6 text-xs uppercase md:flex"><a href="#experiencias">Experiencias</a><a href="#fleet">Fleet</a><a href="#cotizar">Cotizar</a><Link href="/ops">/ops</Link></div>
        </div>
      </header>

      <section className="relative min-h-screen overflow-hidden pt-16">
        {HERO.map((h, i) => <img key={h} src={h} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hero===i?'opacity-100':'opacity-0'}`} alt="Hero"/>) }
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(6,10,16,.85),rgba(6,10,16,.4),rgba(6,10,16,.82))]"/>
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-black uppercase leading-[0.92] md:text-7xl">Recepción digital <span className="gold block">premium</span></h1>
            <p className="mt-4 text-lg text-[#d9d2c6]">Captación, preclasificación y cierre asistido para experiencias náuticas de ticket alto.</p>
            <div className="mt-8 flex gap-3"><a href="#cotizar" className="rounded-full bg-[#f0c98f] px-6 py-3 text-xs font-black uppercase text-[#1b1d20]">Solicitar experiencia</a><a href="https://wa.me/5215555555555" className="rounded-full border border-[#88a7b4] px-6 py-3 text-xs font-bold uppercase">Hablar por WhatsApp</a></div>
          </div>
        </div>
      </section>

      <section id="experiencias" className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-3xl font-black uppercase">Experiencias</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">{EXPERIENCIAS.map((e)=><article key={e} className="lux-panel rounded-2xl p-5"><p className="text-sm font-semibold">{e}</p><p className="mt-2 text-xs text-[#b8c2c9]">Curada por concierge según fecha, grupo y estilo de viaje.</p></article>)}</div>
      </section>

      <section id="fleet" className="mx-auto max-w-7xl px-6 pb-14">
        <h2 className="text-3xl font-black uppercase">Fleet</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">{FLEET.map((f)=><article key={f.name} className="lux-panel rounded-2xl p-6"><h3 className="font-bold">{f.name}</h3><p className="text-sm text-[#cad4db] mt-1">{f.cap} · {f.style}</p><p className="mt-3 text-sm font-semibold text-[#f2d9b1]">{f.from}</p><a href="#cotizar" className="mt-4 inline-block text-xs uppercase underline">Cotizar</a></article>)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <h2 className="text-3xl font-black uppercase">Cómo funciona</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">{['Eliges experiencia','Compartes preferencias','Recibes propuesta curada','Confirmas y navegas'].map((s,i)=><div key={s} className="lux-panel rounded-xl p-4 text-sm"><p className="text-xs text-[#8fb5c3]">0{i+1}</p>{s}</div>)}</div>
      </section>

      <section id="cotizar" className="mx-auto max-w-5xl px-6 pb-14">
        <div className="lux-panel rounded-2xl p-6 md:p-8">
          <h2 className="text-3xl font-black uppercase">Solicitud inteligente</h2>
          <div className="mt-4 h-2 w-full rounded bg-[#1a2a3d]"><div className="h-2 rounded bg-[#e0b373]" style={{width:`${done?100:progress}%`}}/></div>
          {!done ? (
            <>
              {step===1 && <div className="mt-5 grid gap-3 md:grid-cols-2"><input placeholder="Nombre" className="rounded-lg bg-[#0e1a2a] p-3" onChange={e=>setField('nombre',e.target.value)}/><input placeholder="WhatsApp" className="rounded-lg bg-[#0e1a2a] p-3" onChange={e=>setField('whatsapp',e.target.value)}/><input placeholder="Email" className="rounded-lg bg-[#0e1a2a] p-3 md:col-span-2" onChange={e=>setField('email',e.target.value)}/></div>}
              {step===2 && <div className="mt-5 grid gap-3 md:grid-cols-2"><input type="date" className="rounded-lg bg-[#0e1a2a] p-3" onChange={e=>setField('fecha',e.target.value)}/><input placeholder="Número de personas" className="rounded-lg bg-[#0e1a2a] p-3" onChange={e=>setField('personas',e.target.value)}/><select className="rounded-lg bg-[#0e1a2a] p-3" onChange={e=>setField('experiencia',e.target.value)}><option>Tipo de experiencia</option>{EXPERIENCIAS.map(e=><option key={e}>{e}</option>)}</select><input placeholder="Duración estimada" className="rounded-lg bg-[#0e1a2a] p-3" onChange={e=>setField('duracion',e.target.value)}/></div>}
              {step===3 && <div className="mt-5 grid gap-3 md:grid-cols-2"><select className="rounded-lg bg-[#0e1a2a] p-3" onChange={e=>setField('presupuesto',e.target.value)}><option>Rango de presupuesto</option><option>$30k-$60k</option><option>$60k-$100k</option><option>$100k+</option></select><input placeholder="Ocasión" className="rounded-lg bg-[#0e1a2a] p-3" onChange={e=>setField('ocasion',e.target.value)}/><input placeholder="Idioma" className="rounded-lg bg-[#0e1a2a] p-3" onChange={e=>setField('idioma',e.target.value)}/><select className="rounded-lg bg-[#0e1a2a] p-3" onChange={e=>setField('urgencia',e.target.value)}><option>Urgencia</option><option>Alta</option><option>Media</option><option>Baja</option></select></div>}
              {step===4 && <div className="mt-5 grid gap-3"><textarea placeholder="Preferencias adicionales" className="rounded-lg bg-[#0e1a2a] p-3" onChange={e=>setField('preferencias',e.target.value)}/><select className="rounded-lg bg-[#0e1a2a] p-3" onChange={e=>setField('canal',e.target.value)}><option>Canal preferido</option><option>WhatsApp</option><option>Llamada</option><option>Email</option></select></div>}
              <div className="mt-5 flex gap-2">{step>1 && <button onClick={()=>setStep(step-1)} className="rounded-full border px-5 py-2 text-xs uppercase">Atrás</button>}{step<4 ? <button onClick={()=>setStep(step+1)} className="rounded-full bg-[#f0c98f] px-5 py-2 text-xs font-bold uppercase text-[#181b1f]">Siguiente</button> : <button onClick={submit} className="rounded-full bg-[#f0c98f] px-5 py-2 text-xs font-bold uppercase text-[#181b1f]">Enviar solicitud</button>}</div>
            </>
          ) : <div className="mt-6"><p className="text-xl font-semibold">Hemos recibido tu solicitud.</p><p className="mt-2 text-sm text-[#c8d1d8]">Tiempo objetivo de respuesta: 12-20 minutos en horario operativo.</p><a href="https://wa.me/5215555555555" className="mt-4 inline-block rounded-full border px-5 py-2 text-xs uppercase">Abrir WhatsApp ahora</a></div>}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="lux-panel rounded-2xl p-6"><h3 className="text-2xl font-black uppercase">FAQ</h3><div className="mt-4 grid gap-3 md:grid-cols-2">{FAQ.map(([q,a])=><article key={q} className="rounded-xl border border-white/10 p-4"><p className="font-semibold">{q}</p><p className="mt-2 text-sm text-[#c8d1d8]">{a}</p></article>)}</div></div>
      </section>

      <button onClick={()=>setConciergeOpen(!conciergeOpen)} className="fixed bottom-5 right-5 rounded-full bg-[#f0c98f] px-5 py-3 text-xs font-black uppercase text-[#16181b]">AI Concierge</button>
      {conciergeOpen && <div className="fixed bottom-20 right-5 w-80 lux-panel rounded-xl p-4 text-sm"><p className="font-semibold">Asistente de recepción</p><p className="mt-2 text-[#cfd8de]">Puedo ayudarte a elegir experiencia y estimar rango para acelerar tu propuesta.</p><div className="mt-3 space-y-2"><button className="w-full rounded bg-[#102133] p-2 text-left">Quiero sunset charter</button><button className="w-full rounded bg-[#102133] p-2 text-left">Busco corporativo VIP</button></div></div>}
    </main>
  )
}
