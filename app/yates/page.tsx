const experiences = [
  {
    name: 'Sunset Charter',
    copy: 'Una salida privada pensada para atardeceres largos, música, bebidas y una energía elegante.',
    image: '/sunset-charter.jpg'
  },
  {
    name: 'Day Charter Privado',
    copy: 'Ideal para grupos que quieren navegar con amplitud, confort y un servicio de hospitalidad premium.',
    image: '/day-charter.jpg'
  },
  {
    name: 'Celebración a bordo',
    copy: 'Cumpleaños, aniversarios y reuniones especiales producidas con detalle y estilo.',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=1600&q=80'
  },
  {
    name: 'Experiencia romántica',
    copy: 'Una salida íntima con ritmo, timing y servicio diseñado alrededor del momento.',
    image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1600&q=80'
  }
]

export default function YatesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-14">
      <div className="max-w-3xl section-fade">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7e9aae]">Yates & experiencias</p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-[#173042]">Una oferta pensada para vender exclusividad, no solo navegación.</h1>
        <p className="mt-4 text-sm leading-relaxed text-[#476a80]">Tomamos la lógica de un catálogo náutico real y la convertimos en una experiencia más curada, clara y premium para el cliente.</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {experiences.map((item) => (
          <article key={item.name} className="soft-card section-fade overflow-hidden rounded-[34px]">
            <img src={item.image} alt={item.name} className="h-72 w-full object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-black uppercase text-[#173042]">{item.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#476a80]">{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
