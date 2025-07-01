/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dc2626', // red-600
        secondary: '#16a34a', // green-600
        accent: '#ca8a04', // yellow-600
      },
    },
  },
  plugins: [],
} 