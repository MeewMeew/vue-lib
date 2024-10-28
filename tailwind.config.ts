import type { Config } from 'tailwindcss'
// @ts-ignore
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'
import animate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  safelist: ['dark'],
  prefix: '',
  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}'
  ],
  theme: {},
  plugins: [animate, addVariablesForColors]
} satisfies Config

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme('colors'))
  const newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]))
  addBase({ ':root': newVars })
}
