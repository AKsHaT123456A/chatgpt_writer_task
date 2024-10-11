/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './entrypoints/**/*.{html,ts,tsx}',
        './components/**/*.{html,ts,tsx}'
    ],
    prefix: "",
    plugins: [require("tailwindcss-animate")],
}