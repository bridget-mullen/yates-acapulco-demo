const fleet = [
  { name: 'Velaris 42', cap: 'Hasta 10 personas', from: 'Desde $29,000 MXN', img: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1400&q=80' },
  { name: 'Noir 55', cap: 'Hasta 15 personas', from: 'Desde $52,000 MXN', img: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1400&q=80' },
  { name: 'Solenne 60', cap: 'Hasta 20 personas', from: 'Desde $68,000 MXN', img: 'https://images.unsplash.com/photo-1562281302-809108fd533c?auto=format&fit=crop&w=1400&q=80' },
  { name: 'Astra 75', cap: 'Hasta 30 personas', from: 'Desde $110,000 MXN', img: '/astra-75.jpg' }
]

export default function FleetPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-14">
      <div className="max-w-3xl section-fade">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7e9aae]">Flotilla</p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-[#173042]">Embarcaciones mostradas con más presencia visual y mejor lectura comercial.</h1>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {fleet.map((item) => (
          <article key={item.name} className="sand-card section-fade overflow-hidden rounded-[32px]">
            <img src={item.img} alt={item.name} className="h-56 w-full object-cover" />
            <div className="p-5">
              <h2 className="text-xl font-black uppercase text-[#173042]">{item.name}</h2>
              <p className="mt-2 text-sm text-[#4d7186]">{item.cap}</p>
              <p className="mt-4 text-sm font-semibold text-[#173042]">{item.from}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
