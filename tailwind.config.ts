import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        jarsGreen: '#4FA33F',
        jarsOrange: '#EF8F2F',
        jarsCream: '#FFF8EC',
        jarsLeaf: '#2F6A2E'
      }
    }
  },
  plugins: []
}

export default config
