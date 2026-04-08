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

const heroImages = [
  'https://images.unsplash.com/photo-1562281302-809108fd533c?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=2200&q=80'
]

const experiences = [
  { name: 'Sunset Charter', desc: 'Atardecer privado con mixología, música, ruta escénica y atención personalizada.' },
  { name: 'Day Charter Privado', desc: 'Jornada completa para grupos que buscan confort, privacidad y servicio premium.' },
  { name: 'Celebración a bordo', desc: 'Cumpleaños, aniversarios o reuniones especiales con producción cuidada.' },
  { name: 'Experiencia romántica', desc: 'Una salida íntima diseñada alrededor del momento y la atmósfera.' },
  { name: 'Corporativo VIP', desc: 'Hospitality premium para socios, invitados, equipos o clientes de alto valor.' },
  { name: 'Experiencia personalizada', desc: 'Curamos el plan ideal según ocasión, invitados, presupuesto y nivel de servicio.' }
]

const fleet = [
  {
    name: 'Velaris 42',
    capacity: 'Hasta 10 personas',
    style: 'Speed yacht para escapadas premium',
    from: 'Desde $29,000 MXN',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1400&q=80'
  },
  {
    name: 'Noir 55',
    capacity: 'Hasta 15 personas',
    style: 'Yate social para celebración elegante',
    from: 'Desde $52,000 MXN',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1400&q=80'
  },
  {
    name: 'Solenne 60',
    capacity: 'Hasta 20 personas',
    style: 'Catamarán premium con amplitud total',
    from: 'Desde $68,000 MXN',
    image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1400&q=80'
  },
  {
    name: 'Astra 75',
    capacity: 'Hasta 30 personas',
    style: 'Luxury charter para experiencias de alto nivel',
    from: 'Desde $110,000 MXN',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80'
  }
]

const trust = [
  'Atención personalizada desde la primera solicitud',
  'Curaduría privada según ocasión, grupo y estilo de navegación',
  'Hospitality premium con respuesta rápida y ordenada',
  'Discreción, servicio y operación pensada para ticket alto',
  'Proceso asistido para cerrar mejor sin fricción innecesaria',
  'Experiencias privadas con sensación de lujo desde el primer contacto'
]

const faqs = [
  ['¿Cómo funciona la reserva?', 'Compartes fecha, grupo y preferencias; el equipo valida disponibilidad y te envía propuesta curada.'],
  ['¿Qué incluye la experiencia?', 'Depende de la embarcación y nivel de servicio: tripulación, ruta, bebidas, catering y extras personalizados.'],
  ['¿Con cuánta anticipación conviene reservar?', 'Para fechas premium recomendamos anticipación. También se pueden operar solicitudes próximas según disponibilidad.'],
  ['¿Qué pasa si cambia el clima?', 'Se revalida la operación con criterios de seguridad y se plantea una alternativa adecuada para proteger la experiencia.'],
  ['¿Se puede personalizar?', 'Sí. Esta oferta está diseñada para experiencias a medida, no para paquetes rígidos.'],
  ['¿Cómo se confirma?', 'Una vez aprobada la propuesta, el equipo coordina disponibilidad final y el siguiente paso operativo.']
]

const seedLeads: Lead[] = [
  { id:'L-201', nombre:'Andrea Lozano', whatsapp:'+52 55 2188 4411', email:'andrea@novagroup.mx', fecha:'2026-04-19', personas:'14', experiencia:'Corporativo VIP', duracion:'6h', presupuesto:'$90k-$130k', ocasion:'Cierre anual', idioma:'Español/English', preferencias:'DJ lounge + catering premium', urgencia:'Alta', canal:'WhatsApp', estado:'cotización enviada', score:88, origen:'Hero CTA', createdAt:'2026-04-07 13:10', notas:'Alta probabilidad', timeline:['Lead recibido','Preclasificado','Contacto 12 min','Cotización enviada'] },
  { id:'L-202', nombre:'Michael Reed', whatsapp:'+1 305 554 0022', email:'mreed@orionpartners.com', fecha:'2026-04-22', personas:'8', experiencia:'Experiencia romántica', duracion:'4h', presupuesto:'$55k-$80k', ocasion:'Aniversario', idioma:'English', preferencias:'Atardecer + champagne', urgencia:'Media', canal:'Email', estado:'contacto realizado', score:73, origen:'AI Concierge', createdAt:'2026-04-07 15:42', notas:'Necesita confirmar fecha', timeline:['Lead recibido','Preclasificado','Contacto realizado'] }
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
    const id = setInterval(() => setHero((p) => (p + 1) % heroImages.length), 3000)
    loadLeads()
    return () => clearInterval(id)
  }, [])

  const progress = useMemo(() => (step / 4) * 100, [step])

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
      notas: 'Lead premium recibido desde el inquiry flow',
      timeline: ['Lead recibido', 'Pendiente de preclasificación']
    }
    const leads = loadLeads()
    saveLeads([lead, ...leads])
    setDone(true)
  }

  return (
    <main className="min-h-screen bg-[#09070a] text-[#f5efe8]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#120d12]/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="text-lg font-black uppercase tracking-[0.2em] text-[#f0e0c7]">Aurea</div>
          <nav className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d9d0c5] md:flex">
            <a href="#experiencias">Experiencias</a>
            <a href="#fleet">Fleet</a>
            <a href="#proceso">Proceso</a>
            <a href="#cotizar">Cotizar</a>
            <Link href="/ops">Ops</Link>
          </nav>
        </div>
      </header>

      <section className="relative min-h-screen overflow-hidden pt-16">
        {heroImages.map((img, i) => (
          <img key={img} src={img} alt="Yacht hero" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hero === i ? 'opacity-100' : 'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,7,10,.4),rgba(9,7,10,.62),rgba(9,7,10,.94))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(215,179,122,.15),transparent_24%)]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-between px-6 py-10">
          <div className="pt-12" />
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] uppercase tracking-[0.36em] text-[#c6d6e3]">Private Charter Collection</p>
            <h1 className="mt-5 text-6xl font-black uppercase tracking-[0.18em] text-[#f6ecdc] md:text-8xl">Aurea</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#ece3d8] md:text-xl">
              Charter privado, servicio impecable y noches diseñadas para impresionar. Una experiencia premium que se siente exclusiva antes de subir a bordo.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#cotizar" className="rounded-full bg-[#f0c98f] px-7 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#1a1817]">Solicitar experiencia</a>
              <a href="https://wa.me/5215555555555" className="rounded-full border border-[#d4be97] bg-black/20 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#f3ece1]">WhatsApp</a>
            </div>
          </div>
          <div className="mx-auto grid w-full max-w-6xl gap-3 md:grid-cols-3">
            <div className="rounded-[26px] border border-white/10 bg-black/25 px-5 py-4 backdrop-blur-md">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#e7d5b2]">Atención</p>
              <p className="mt-2 text-sm text-[#f4eee8]">Contacto asistido, respuesta prioritaria y trato de concierge.</p>
            </div>
            <div className="rounded-[26px] border border-white/10 bg-black/25 px-5 py-4 backdrop-blur-md">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#e7d5b2]">Experiencias</p>
              <p className="mt-2 text-sm text-[#f4eee8]">Sunset charters, celebraciones y salidas privadas de alto nivel.</p>
            </div>
            <div className="rounded-[26px] border border-white/10 bg-black/25 px-5 py-4 backdrop-blur-md">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#e7d5b2]">Hospitality</p>
              <p className="mt-2 text-sm text-[#f4eee8]">Servicio cuidado, lujo sin fricción y propuesta curada para cada ocasión.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="experiencias" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#d7c19b]">Experiencias</p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-[0.96] text-[#f5ead8]">Salidas privadas con energía de lujo, mar y after party.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {experiences.map((item, i) => (
            <article key={item.name} className={`rounded-[30px] border p-6 ${i % 3 === 0 ? 'border-[#6a5133] bg-[#171116]' : i % 3 === 1 ? 'border-[#27404d] bg-[#0f1820]' : 'border-[#4a3940] bg-[#151015]'}`}>
              <p className="text-lg font-semibold text-[#f6ecdc]">{item.name}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#d8d1c8]">{item.desc}</p>
              <a href="#cotizar" className="mt-5 inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-[#efc98c]">Diseñar salida</a>
            </article>
          ))}
        </div>
      </section>

      <section id="fleet" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#d7c19b]">Fleet</p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-[0.96] text-[#f5ead8]">Embarcaciones para distintos niveles de experiencia.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {fleet.map((item) => (
            <article key={item.name} className="overflow-hidden rounded-[30px] border border-[#3d3133] bg-[#120f13]">
              <img src={item.image} alt={item.name} className="h-56 w-full object-cover" />
              <div className="p-5">
                <p className="text-xl font-semibold text-[#f7efdf]">{item.name}</p>
                <p className="mt-2 text-sm text-[#dfd7cd]">{item.capacity}</p>
                <p className="mt-1 text-sm text-[#bfae98]">{item.style}</p>
                <p className="mt-4 text-sm font-semibold text-[#f0c98f]">{item.from}</p>
                <a href="#cotizar" className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-[#f4ebdf]">Solicitar propuesta</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="proceso" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-4">
          {['Eliges el tipo de experiencia', 'Compartes fecha, grupo y preferencias', 'Recibes una propuesta curada', 'Confirmas con acompañamiento humano'].map((item, i) => (
            <article key={item} className="rounded-[28px] border border-[#3a2f33] bg-[#120f14] p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#d8c29c]">0{i + 1}</p>
              <p className="mt-3 text-lg font-semibold leading-snug text-[#f5ecdf]">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trust.map((item) => (
            <article key={item} className="rounded-[26px] border border-[#233848] bg-[#0f1820] p-5 text-sm leading-relaxed text-[#e2d9cf]">{item}</article>
          ))}
        </div>
      </section>

      <section id="cotizar" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-[40px] border border-[#644f34] bg-[linear-gradient(180deg,#171117,#0f0b10)] p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-[.75fr_1.25fr] md:items-start">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#d7c19b]">Inquiry flow</p>
              <h2 className="mt-3 text-4xl font-black uppercase leading-[0.95] text-[#f5ead8]">Solicita una experiencia a medida.</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#d7d0c7]">Un flujo guiado para recibir tu solicitud con claridad y responder con una propuesta premium, no con una respuesta genérica.</p>
            </div>

            <div className="rounded-[32px] border border-[#342a2d] bg-[#120f13] p-5">
              <div className="h-2 w-full rounded-full bg-[#2a2125]"><div className="h-2 rounded-full bg-[#f0c98f] transition-all" style={{ width: `${done ? 100 : progress}%` }} /></div>

              {!done ? (
                <div className="mt-5 space-y-4">
                  {step === 1 && (
                    <div className="grid gap-3 md:grid-cols-2">
                      <input value={form.nombre} onChange={(e) => setField('nombre', e.target.value)} placeholder="Nombre" className="rounded-2xl bg-[#1b171b] px-4 py-3" />
                      <input value={form.whatsapp} onChange={(e) => setField('whatsapp', e.target.value)} placeholder="WhatsApp" className="rounded-2xl bg-[#1b171b] px-4 py-3" />
                      <input value={form.email} onChange={(e) => setField('email', e.target.value)} placeholder="Email" className="rounded-2xl bg-[#1b171b] px-4 py-3 md:col-span-2" />
                    </div>
                  )}
                  {step === 2 && (
                    <div className="grid gap-3 md:grid-cols-2">
                      <input type="date" value={form.fecha} onChange={(e) => setField('fecha', e.target.value)} className="rounded-2xl bg-[#1b171b] px-4 py-3" />
                      <input value={form.personas} onChange={(e) => setField('personas', e.target.value)} placeholder="Número de personas" className="rounded-2xl bg-[#1b171b] px-4 py-3" />
                      <select value={form.experiencia} onChange={(e) => setField('experiencia', e.target.value)} className="rounded-2xl bg-[#1b171b] px-4 py-3"><option value="">Tipo de experiencia</option>{experiences.map((x)=><option key={x.name}>{x.name}</option>)}</select>
                      <input value={form.duracion} onChange={(e) => setField('duracion', e.target.value)} placeholder="Duración estimada" className="rounded-2xl bg-[#1b171b] px-4 py-3" />
                    </div>
                  )}
                  {step === 3 && (
                    <div className="grid gap-3 md:grid-cols-2">
                      <select value={form.presupuesto} onChange={(e) => setField('presupuesto', e.target.value)} className="rounded-2xl bg-[#1b171b] px-4 py-3"><option value="">Rango de presupuesto</option><option>$30k-$60k</option><option>$60k-$100k</option><option>$100k+</option></select>
                      <input value={form.ocasion} onChange={(e) => setField('ocasion', e.target.value)} placeholder="Ocasión" className="rounded-2xl bg-[#1b171b] px-4 py-3" />
                      <input value={form.idioma} onChange={(e) => setField('idioma', e.target.value)} placeholder="Idioma" className="rounded-2xl bg-[#1b171b] px-4 py-3" />
                      <select value={form.urgencia} onChange={(e) => setField('urgencia', e.target.value)} className="rounded-2xl bg-[#1b171b] px-4 py-3"><option value="">Urgencia</option><option>Alta</option><option>Media</option><option>Baja</option></select>
                    </div>
                  )}
                  {step === 4 && (
                    <div className="grid gap-3">
                      <textarea value={form.preferencias} onChange={(e) => setField('preferencias', e.target.value)} placeholder="Preferencias adicionales" className="min-h-28 rounded-2xl bg-[#1b171b] px-4 py-3" />
                      <select value={form.canal} onChange={(e) => setField('canal', e.target.value)} className="rounded-2xl bg-[#1b171b] px-4 py-3"><option value="">Canal de contacto preferido</option><option>WhatsApp</option><option>Llamada</option><option>Email</option></select>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {step > 1 && <button onClick={() => setStep(step - 1)} className="rounded-full border border-[#58494c] px-5 py-2 text-xs font-bold uppercase tracking-[0.16em]">Atrás</button>}
                    {step < 4 ? <button onClick={() => setStep(step + 1)} className="rounded-full bg-[#f0c98f] px-5 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#171513]">Siguiente</button> : <button onClick={() => submitLead()} className="rounded-full bg-[#f0c98f] px-5 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#171513]">Enviar solicitud</button>}
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-[24px] border border-[#403235] bg-[#191317] p-5">
                  <p className="text-2xl font-semibold text-[#f7efdf]">Hemos recibido tu solicitud.</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#d8d0c7]">En breve recibirás atención personalizada para definir disponibilidad, embarcación recomendada y siguientes pasos.</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a href="https://wa.me/5215555555555" className="rounded-full bg-[#f0c98f] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#171513]">Abrir WhatsApp</a>
                    <a href="#experiencias" className="rounded-full border border-[#68575d] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em]">Explorar experiencias</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-[1.05fr_.95fr]">
          <div className="rounded-[32px] border border-[#233848] bg-[#0f1820] p-6">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#a8c8d5]">FAQ</p>
            <div className="mt-4 space-y-3">
              {faqs.map(([q, a]) => (
                <article key={q} className="rounded-[22px] border border-[#2d4353] bg-[#111c25] p-4">
                  <p className="font-semibold text-[#f5ecdf]">{q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#d5dce1]">{a}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-[#5c4c37] bg-[#171116] p-6">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#d7c19b]">Atención guiada</p>
            <h3 className="mt-3 text-4xl font-black uppercase leading-[0.95] text-[#f5ead8]">Concierge inicial para acelerar la conversación.</h3>
            <p className="mt-4 text-sm leading-relaxed text-[#ddd4cb]">Una capa de asistencia elegante que ayuda a orientar la solicitud antes de pasar con el equipo, sin fingir que la venta se cierra sola.</p>
            <button onClick={() => setConciergeOpen(!conciergeOpen)} className="mt-6 rounded-full bg-[#f0c98f] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#171513]">Abrir concierge</button>
          </div>
        </div>
      </section>

      {conciergeOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[340px] rounded-[28px] border border-[#695137] bg-[#181116] p-4 shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#f7eddd]">Concierge Aurea</p>
          <p className="mt-2 text-sm leading-relaxed text-[#ddd4cb]">Cuéntanos qué tipo de salida tienes en mente y te orientamos antes de pasar con el equipo.</p>
          <div className="mt-4 space-y-2">
            <button className="w-full rounded-2xl bg-[#231920] p-3 text-left text-sm text-[#f4ecdf]">Quiero sunset charter</button>
            <button className="w-full rounded-2xl bg-[#231920] p-3 text-left text-sm text-[#f4ecdf]">Busco corporativo VIP</button>
            <button className="w-full rounded-2xl bg-[#231920] p-3 text-left text-sm text-[#f4ecdf]">Necesito experiencia a medida</button>
          </div>
        </div>
      )}
    </main>
  )
}
