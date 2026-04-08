import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aurea Yachts | Recepción digital premium',
  description:
    'Sistema comercial premium de captación y cierre para experiencias náuticas de alto ticket.',
  openGraph: {
    title: 'Aurea Yachts',
    description: 'Experiencias privadas de lujo con captación y operación comercial asistida.',
    type: 'website'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
