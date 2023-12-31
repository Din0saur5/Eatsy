/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'forest_green':'#228B22',
      'beige':'#F5E8D6',
      'raspberry':'#E30B5D',
      'darkBrown': '#5C4033',
      'flesh': '#DABDAF',
      'brown': '#AA9261 '
      
    },
    extend: {
      fontFamily: {
        'cormorant': ['cormorant-garamond', 'serif']
      },
      backgroundImage: {
        'background1': "url('/images/background1.png')",
        'background2': "url('/images/background2.png')",
        'background3': "url('/images/background3.png')",
        'background4': "url('/images/background4.png')",
        'background5': "url('/images/background5.png')",
        'background6': "url('/images/background6.png')",
        'old-paper': "url('/images/old_page_1.jpg')",
        'bg7': "url('/images/border-3.png')",
        'ribbon' : 'linear-gradient(270deg, #6A9A62, #4F7942 50%, #4F7942 51%,  #3B5F31 85%, #3fb648 90%, #003404 100% )',
        'blue-ribbon' : ' linear-gradient(270deg, rgba(96,165,250,1) 0%, rgba(91,160,249,1) 22%, rgba(91,160,249,1) 31%, rgba(83,149,245,1) 54%, rgba(59,117,232,1) 67%, rgba(44,98,224,1) 75%, rgba(44,98,224,1) 83%, rgba(59,130,246,1) 90%, rgba(30,64,175,1) 100%)',
        'beveled-edge': 'linear-gradient(to bottom, #6A9A62, #4F7942 50%, #4F7942 51%, #3B5F31 100%)',
        'dark-grad': "linear-gradient(180deg, rgba(229,194,167,1) 0%, rgba(206,174,150,1) 20%, rgba(190,160,138,1) 41%, rgba(136,115,100,1) 70%, rgba(114,97,83,1) 80%, rgba(45,38,33,1) 100% )",
        'light-grad': 'linear-gradient(0deg, rgba(249,242,237,1) 0%, rgba(247,236,228,1) 11%, rgba(244,230,219,1) 22%, rgba(242,224,211,1) 33%, rgba(239,218,202,1) 44%, rgba(236,212,193,1) 55%, rgba(234,206,184,1) 66%, rgba(231,200,175,1) 77%, rgba(229,194,167,1) 100%)',
        'legible': 'bg-[#F5E8D6] bg-opacity-50 rounded-2xl shadow-[0_0_10px_5px_rgba(245,232,214,0.5)]'
      },
      background: {
        'legible': 'bg-[#F5E8D6] bg-opacity-50 rounded-2xl shadow-[0_0_10px_5px_rgba(245,232,214,0.5)]'
      },
      boxShadow: {
        'inner-highlight': 'inset 0 1px 2px #6A9A62',
      },
      width:{
        '4/5' : '80vw',
      }
    },
  },
  plugins: [
    
    require('flowbite/plugin'),
     plugin(function({ addUtilities }) {
      addUtilities({
        '.underline-custom': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -25,
            height: '5px', // Tailwind's default border width
            backgroundColor: '#365314', // Replace with your underline color
          },
        },
      });
    }),
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.4xl') },
        'h2': { fontSize: theme('fontSize.2xl') },
        'h3': { fontSize: theme('fontSize.xl') }, 
        'h4': { fontSize: theme('fontSize.lg') }, 
      })
    })
  
],
}

