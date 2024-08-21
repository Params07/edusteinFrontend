/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
    ],
},
  theme: {
    extend: {
      colors:{
        navItems:"#0D2443",
        line:"#D2AD20"
        
      },
      fontFamily: {
        redhat: ['Red Hat Display', 'sans-serif'],
      },
      height: {
        '84': '21rem', 
        '558':'35rem',
        '4/9': '44.44%'
      },
      width:{
        '500':'30rem',
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
],
}

