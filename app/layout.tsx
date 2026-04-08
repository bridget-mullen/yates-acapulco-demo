import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aurea Yachts | Charter privado premium',
  description: 'Sitio premium de yates y experiencias privadas con fleet, experiencias y reservaciones.',
  openGraph: {
    title: 'Aurea Yachts',
    description: 'Charter privado premium con experiencias curadas y reservación asistida.',
    type: 'website'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="sticky top-0 z-50 border-b border-[#d8e4ea] bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <Link href="/" className="text-lg font-black uppercase tracking-[0.22em] text-[#173042]">Aurea</Link>
            <nav className="hidden items-center gap-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[#36556a] md:flex">
              <Link href="/">Inicio</Link>
              <Link href="/yates">Yates</Link>
              <Link href="/flotilla">Flotilla</Link>
              <Link href="/reservaciones">Reservaciones</Link>
              <Link href="/ops">Ops</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
