/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--barlow-font)', 'sans-serif'],
        // serif: ['Merriweather', 'serif'],
      },
      gridTemplateRows: {
        'beer-modal': 'repeat(5, min-content)',
      },
      gridTemplateColumns: {
        'beer-modal': '1fr 300px',
      },
      maxHeight: {
        modal: 'calc(100% - 128px)',
        'modal-image': 'min(calc(100vh - 100px - 64px), 500px)',
      },
      maxWidth: {
        modal: 'min(calc(100% - 32px), 42rem)',
      },
    },
  },
  plugins: [],
}
