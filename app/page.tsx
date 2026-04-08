"use client"

import Link from 'next/link'
import { FormEvent, useEffect, useMemo, useState } from 'react'

type StepForm = {
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
}

type Lead = StepForm & {
  id: string
  estado: string
  score: number
  origen: string
  createdAt: string
  notas: string
  timeline: string[]
}

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=2200&q=80',
    eyebrow: 'Private Yacht Collection',
    title: 'Charters privados diseñados para impresionar desde el primer contacto.',
    copy: 'Experiencias náuticas curadas para huéspedes que buscan privacidad, servicio impecable y una atención que se siente verdaderamente premium.'
  },
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80',
    eyebrow: 'Luxury Yachting',
    title: 'Navegación privada con servicio curado, estilo impecable y lujo sin fricción.',
    copy: 'Desde un sunset charter hasta una celebración a bordo, cada detalle se prepara con la precisión y el cuidado que espera un cliente de alto nivel.'
  },
  {
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=2200&q=80',
    eyebrow: 'Private Hospitality',
    title: 'Cada salida comienza con una conversación cuidada y termina en una experiencia a la altura de la ocasión.',
    copy: 'Creamos propuestas a medida para parejas, grupos privados, celebraciones y experiencias corporativas con estándar premium.'
  }
]

const experiences = [
  { name: 'Sunset Charter', desc: 'Atardeceres privados con servicio curado, mixología y ruta escénica.' },
  { name: 'Day Charter Privado', desc: 'Jornada completa para grupos que quieren confort, servicio y flexibilidad.' },
  { name: 'Celebración a bordo', desc: 'Cumpleaños, aniversarios y momentos especiales atendidos con detalle.' },
  { name: 'Experiencia romántica', desc: 'Una salida íntima con timing, ambientación y atención personalizada.' },
  { name: 'Corporativo VIP', desc: 'Hospitality premium para reuniones privadas, aliados o clientes clave.' },
  { name: 'Experiencia personalizada', desc: 'Diseñamos el plan alrededor del grupo, la ocasión y el nivel de servicio.' }
]

const fleet = [
  { name: 'Sport Yacht 42', capacity: 'Hasta 10 personas', style: 'Salida ágil y sofisticada', from: 'Desde $29,000 MXN' },
  { name: 'Premium Yacht 55', capacity: 'Hasta 15 personas', style: 'Experiencia high-touch', from: 'Desde $52,000 MXN' },
  { name: 'Private Catamaran 60', capacity: 'Hasta 20 personas', style: 'Amplitude + social luxury', from: 'Desde $68,000 MXN' },
  { name: 'Extended Luxury 75', capacity: 'Hasta 30 personas', style: 'Hospitality full-service', from: 'Desde $110,000 MXN' }
]

const trustPoints = [
  'Atención personalizada desde el primer contacto',
  'Respuesta asistida con lógica de prioridad',
  'Experiencias privadas con operación cuidada',
  'Tripulación, discreción y curaduría premium',
  'Seguimiento comercial sin fricción para el cliente',
  'Proceso claro para leads serios y fechas sensibles'
]

const faqs = [
  ['¿Cómo funciona la reserva?', 'Completas tu solicitud, el equipo revisa disponibilidad y te envía una propuesta curada según tu grupo, fecha y nivel de servicio.'],
  ['¿Qué incluye la experiencia?', 'La propuesta se adapta a la embarcación, ruta, tripulación, alimentos, bebidas y addons seleccionados.'],
  ['¿Con cuánta anticipación conviene reservar?', 'Para fechas premium recomendamos anticipación. También operamos solicitudes próximas sujetas a disponibilidad.'],
  ['¿Qué pasa si cambia el clima?', 'Se revalida la operación con criterios de seguridad y se plantea la mejor alternativa posible.'],
  ['¿Se puede personalizar todo?', 'Sí. El modelo está pensado para experiencias a medida, no para paquetes rígidos.'],
  ['¿Cómo se confirma?', 'Una vez aprobada la propuesta, el equipo coordina la confirmación y el siguiente paso operativo.']
]

const seedLeads: Lead[] = [
  { id:'L-201', nombre:'Andrea Lozano', whatsapp:'+52 55 2188 4411', email:'andrea@novagroup.mx', fecha:'2026-04-19', personas:'14', experiencia:'Corporativo VIP', duracion:'6h', presupuesto:'$90k-$130k', ocasion:'Cierre anual', idioma:'Español/English', preferencias:'DJ lounge + catering premium', urgencia:'Alta', canal:'WhatsApp', estado:'cotización enviada', score:88, origen:'Hero CTA', createdAt:'2026-04-07 13:10', notas:'Alta probabilidad', timeline:['Lead recibido','Preclasificado','Contacto 12 min','Cotización enviada'] },
  { id:'L-202', nombre:'Michael Reed', whatsapp:'+1 305 554 0022', email:'mreed@orionpartners.com', fecha:'2026-04-22', personas:'8', experiencia:'Experiencia romántica', duracion:'4h', presupuesto:'$55k-$80k', ocasion:'Aniversario', idioma:'English', preferencias:'Atardecer + champagne', urgencia:'Media', canal:'Email', estado:'contacto realizado', score:73, origen:'Atención guiada', createdAt:'2026-04-07 15:42', notas:'Necesita confirmar fecha', timeline:['Lead recibido','Preclasificado','Contacto realizado'] }
]

function loadLeads() {
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
  const [form, setForm] = useState<StepForm>({
    nombre: '', whatsapp: '', email: '', fecha: '', personas: '', experiencia: '', duracion: '', presupuesto: '', ocasion: '', idioma: '', preferencias: '', urgencia: '', canal: ''
  })

  useEffect(() => {
    const id = setInterval(() => setHero((p) => (p + 1) % heroSlides.length), 3000)
    loadLeads()
    return () => clearInterval(id)
  }, [])

  const progress = useMemo(() => (step / 4) * 100, [step])
  const slide = heroSlides[hero]

  function setField<K extends keyof StepForm>(key: K, value: StepForm[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function submitLead(e?: FormEvent) {
    e?.preventDefault()
    const lead: Lead = {
      ...form,
      id: 'L-' + Math.floor(Math.random() * 900 + 300),
      estado: 'nuevo',
      score: form.presupuesto.includes('100') || form.urgencia === 'Alta' ? 91 : 74,
      origen: 'Multi-step Inquiry',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      notas: 'Lead ingresado desde solicitud premium',
      timeline: ['Lead recibido', 'Pendiente de preclasificación']
    }
    const leads = loadLeads()
    saveLeads([lead, ...leads])
    setDone(true)
  }

  return (
    <main className="min-h-screen bg-[#070b12] text-[#f3eee7]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#08101a]/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="text-lg font-black uppercase tracking-[0.18em]">Aurea Yachts</div>
          <nav className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d6dde2] md:flex">
            <a href="#experiencias">Experiencias</a>
            <a href="#fleet">Fleet</a>
            <a href="#proceso">Cómo funciona</a>
            <a href="#cotizar">Cotizar</a>
            <Link href="/ops">Ops</Link>
          </nav>
        </div>
      </header>

      <section className="relative min-h-screen overflow-hidden pt-16">
        {heroSlides.map((item, i) => (
          <img key={item.image} src={item.image} alt={item.title} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hero === i ? 'opacity-100' : 'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(7,11,18,.88)_18%,rgba(7,11,18,.42)_50%,rgba(7,11,18,.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgba(212,177,121,.14),transparent_22%)]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-6 py-14 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#a9d2e2]">{slide.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black uppercase leading-[0.92] md:text-7xl">{slide.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#d9e1e5]">{slide.copy}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cotizar" className="rounded-full bg-[#f0c98f] px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#1a1d21]">Solicitar propuesta</a>
              <a href="https://wa.me/5215555555555" className="rounded-full border border-[#8ca2ad] bg-[#0f1924]/70 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#dcebf1]">WhatsApp</a>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <article className="lux-panel rounded-[28px] p-5 md:translate-y-8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#94bcca]">Tiempo objetivo</p>
              <p className="mt-3 text-4xl font-black gold">12–20 min</p>
              <p className="mt-3 text-sm leading-relaxed text-[#c7d1d7]">Un proceso cuidado, discreto y eficiente para responder con la velocidad que exige una experiencia premium.</p>
            </article>
            <article className="lux-panel rounded-[28px] p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#94bcca]">Atención curada</p>
              <p className="mt-3 text-lg font-semibold">Hospitality, claridad y servicio desde el primer contacto</p>
              <p className="mt-3 text-sm leading-relaxed text-[#c7d1d7]">Todo está pensado para que reservar se sienta tan premium como la experiencia misma.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="experiencias" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#98c4d5]">Experiencias curadas</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-[0.95]">Experiencias pensadas para huéspedes que esperan más que un paseo.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-[#c7d1d7]">Seleccionamos el formato ideal según el tipo de ocasión, el número de invitados y el nivel de servicio esperado. Todo se presenta con claridad, sin fricción y con criterio de hospitality.</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {experiences.map((item, i) => (
            <article key={item.name} className={`rounded-[30px] border p-6 ${i % 2 === 0 ? 'border-[#d1aa70]/30 bg-[#111826]' : 'border-[#294255] bg-[#0d1622]'}`}>
              <p className="text-sm font-semibold uppercase tracking-[0.08em]">{item.name}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#ccd6dd]">{item.desc}</p>
              <a href="#cotizar" className="mt-5 inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-[#f1cd95]">Diseñar propuesta</a>
            </article>
          ))}
        </div>
      </section>

      <section id="fleet" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-[36px] border border-[#223445] bg-[#0c1520] p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#a0c3d1]">Fleet preview</p>
              <h2 className="mt-3 text-4xl font-black uppercase leading-[0.95]">Embarcaciones seleccionadas</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#c5d0d8]">Una selección sobria para comunicar estilo, capacidad y nivel de experiencia. La intención no es saturar con opciones, sino mostrar una oferta clara, elegante y aspiracional.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {fleet.map((item) => (
                <article key={item.name} className="rounded-[26px] border border-[#30485c] bg-[#101b28] p-5">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="mt-2 text-sm text-[#d4dde3]">{item.capacity}</p>
                  <p className="mt-1 text-sm text-[#aebec8]">{item.style}</p>
                  <p className="mt-4 text-sm font-semibold text-[#f3d7aa]">{item.from}</p>
                  <a href="#cotizar" className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-[#cfe4ec]">Cotizar opción</a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="proceso" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-3 md:grid-cols-4">
          {['Eliges experiencia', 'Compartes datos y preferencias', 'Recibes propuesta curada', 'Confirmas con acompañamiento humano'].map((item, i) => (
            <article key={item} className="lux-panel rounded-[26px] p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#9cc2d0]">0{i + 1}</p>
              <p className="mt-3 text-lg font-semibold leading-snug">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#98c4d5]">Diferenciales</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-[0.95]">Confianza, servicio y discreción en cada contacto.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {trustPoints.map((item) => (
              <article key={item} className="rounded-[22px] border border-[#2a4153] bg-[#0d1622] p-4 text-sm leading-relaxed text-[#d5dde2]">{item}</article>
            ))}
          </div>
        </div>
      </section>

      <section id="cotizar" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-[38px] border border-[#c7a671]/28 bg-[linear-gradient(180deg,#0c1521,#0a1018)] p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#a4c8d6]">Multi-step inquiry</p>
              <h2 className="mt-2 text-4xl font-black uppercase leading-[0.95]">Solicita una experiencia a medida</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-[#c5d0d7]">Compártenos fecha, grupo y preferencias. Nuestro equipo te contactará con una propuesta curada según el tipo de salida que buscas.</p>
          </div>

          <div className="mt-6 h-2 w-full rounded-full bg-[#162334]"><div className="h-2 rounded-full bg-[#e1b578] transition-all" style={{ width: `${done ? 100 : progress}%` }} /></div>

          {!done ? (
            <div className="mt-6 space-y-4">
              {step === 1 && (
                <div className="grid gap-3 md:grid-cols-2">
                  <input value={form.nombre} onChange={(e) => setField('nombre', e.target.value)} placeholder="Nombre" className="rounded-2xl bg-[#101a29] px-4 py-3" />
                  <input value={form.whatsapp} onChange={(e) => setField('whatsapp', e.target.value)} placeholder="WhatsApp" className="rounded-2xl bg-[#101a29] px-4 py-3" />
                  <input value={form.email} onChange={(e) => setField('email', e.target.value)} placeholder="Email" className="rounded-2xl bg-[#101a29] px-4 py-3 md:col-span-2" />
                </div>
              )}
              {step === 2 && (
                <div className="grid gap-3 md:grid-cols-2">
                  <input type="date" value={form.fecha} onChange={(e) => setField('fecha', e.target.value)} className="rounded-2xl bg-[#101a29] px-4 py-3" />
                  <input value={form.personas} onChange={(e) => setField('personas', e.target.value)} placeholder="Número de personas" className="rounded-2xl bg-[#101a29] px-4 py-3" />
                  <select value={form.experiencia} onChange={(e) => setField('experiencia', e.target.value)} className="rounded-2xl bg-[#101a29] px-4 py-3"><option value="">Tipo de experiencia</option>{experiences.map((x)=><option key={x.name}>{x.name}</option>)}</select>
                  <input value={form.duracion} onChange={(e) => setField('duracion', e.target.value)} placeholder="Duración estimada" className="rounded-2xl bg-[#101a29] px-4 py-3" />
                </div>
              )}
              {step === 3 && (
                <div className="grid gap-3 md:grid-cols-2">
                  <select value={form.presupuesto} onChange={(e) => setField('presupuesto', e.target.value)} className="rounded-2xl bg-[#101a29] px-4 py-3"><option value="">Rango de presupuesto</option><option>$30k-$60k</option><option>$60k-$100k</option><option>$100k+</option></select>
                  <input value={form.ocasion} onChange={(e) => setField('ocasion', e.target.value)} placeholder="Ocasión especial" className="rounded-2xl bg-[#101a29] px-4 py-3" />
                  <input value={form.idioma} onChange={(e) => setField('idioma', e.target.value)} placeholder="Idioma" className="rounded-2xl bg-[#101a29] px-4 py-3" />
                  <select value={form.urgencia} onChange={(e) => setField('urgencia', e.target.value)} className="rounded-2xl bg-[#101a29] px-4 py-3"><option value="">Urgencia</option><option>Alta</option><option>Media</option><option>Baja</option></select>
                </div>
              )}
              {step === 4 && (
                <div className="grid gap-3">
                  <textarea value={form.preferencias} onChange={(e) => setField('preferencias', e.target.value)} placeholder="Preferencias adicionales" className="min-h-28 rounded-2xl bg-[#101a29] px-4 py-3" />
                  <select value={form.canal} onChange={(e) => setField('canal', e.target.value)} className="rounded-2xl bg-[#101a29] px-4 py-3"><option value="">Canal de contacto preferido</option><option>WhatsApp</option><option>Llamada</option><option>Email</option></select>
                </div>
              )}

              <div className="flex gap-2">
                {step > 1 && <button onClick={() => setStep(step - 1)} className="rounded-full border border-[#4c6070] px-5 py-2 text-xs font-bold uppercase tracking-[0.14em]">Atrás</button>}
                {step < 4 ? (
                  <button onClick={() => setStep(step + 1)} className="rounded-full bg-[#f0c98f] px-5 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#1a1d21]">Siguiente</button>
                ) : (
                  <button onClick={() => submitLead()} className="rounded-full bg-[#f0c98f] px-5 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#1a1d21]">Enviar solicitud</button>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-[26px] border border-[#304859] bg-[#0f1824] p-6">
              <p className="text-2xl font-semibold">Hemos recibido tu solicitud.</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#c7d1d7]">En breve recibirás atención personalizada para definir disponibilidad, embarcación recomendada y siguientes pasos.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="https://wa.me/5215555555555" className="rounded-full bg-[#f0c98f] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#1a1d21]">Abrir WhatsApp</a>
                <a href="#experiencias" className="rounded-full border border-[#556b7b] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em]">Explorar experiencias</a>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[30px] border border-[#2b4252] bg-[#0d1622] p-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#98c4d5]">FAQ</p>
            <div className="mt-4 space-y-3">
              {faqs.map(([q, a]) => (
                <article key={q} className="rounded-[20px] border border-white/10 bg-[#111b28] p-4">
                  <p className="font-semibold">{q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#ccd6dd]">{a}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-[30px] border border-[#c6a46f]/25 bg-[#0b1118] p-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#98c4d5]">Atención guiada</p>
            <h3 className="mt-3 text-3xl font-black uppercase leading-[0.95]">Una guía inicial pensada para acelerar tu atención.</h3>
            <p className="mt-4 text-sm leading-relaxed text-[#cdd6dc]">Si ya tienes una idea de experiencia, podemos orientarte desde el primer mensaje para que el equipo llegue a la conversación con contexto claro.</p>
            <button onClick={() => setConciergeOpen(!conciergeOpen)} className="mt-5 rounded-full bg-[#f0c98f] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#1a1d21]">Abrir concierge</button>
          </div>
        </div>
      </section>

      {conciergeOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[330px] rounded-[24px] border border-[#c7a671]/28 bg-[#0f1722] p-4 shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.08em]">Concierge Aurea</p>
          <p className="mt-2 text-sm leading-relaxed text-[#ccd6dd]">Cuéntanos qué tipo de salida tienes en mente y te orientamos antes de pasar con el equipo.</p>
          <div className="mt-4 space-y-2">
            <button className="w-full rounded-2xl bg-[#162232] p-3 text-left text-sm">Quiero sunset charter</button>
            <button className="w-full rounded-2xl bg-[#162232] p-3 text-left text-sm">Busco corporativo VIP</button>
            <button className="w-full rounded-2xl bg-[#162232] p-3 text-left text-sm">Necesito experiencia a medida</button>
          </div>
        </div>
      )}
    </main>
  )
}
