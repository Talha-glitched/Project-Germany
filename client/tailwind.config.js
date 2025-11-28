/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0F172A', // Slate 900
                secondary: '#F59E0B', // Amber 500 (German Flag Gold)
                accent: '#DC2626', // Red 600 (German Flag Red)
                neutral: '#F3F4F6', // Gray 100
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
