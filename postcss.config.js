export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {}, // autoprefixer is usually included in @tailwindcss/postcss but keeping it explicit doesn't hurt, or I can remove it if I trust v4. v4 includes it.
  },
}
