/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
  //  Bu süslü parantesizn içinde neler i kulacaksam onları yazdım ☝
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require('tw-elements/dist/plugin')
  ],
};
