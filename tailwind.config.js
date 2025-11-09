/**
 * Tailwind CSS configuration for the Social Media SaaS frontend.
 *
 * The `content` array tells Tailwind where to look for class names so it can
 * generate the appropriate utility styles. We scan all files in the `pages`
 * and `components` folders. The `@tailwindcss/forms` plugin is included to
 * provide sensible default styling for form inputs, selects and buttons.
 */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // extend: {
    //   colors: {
    //     'charcoal-dark': '#121212',
    //     'deep-bg': '#0F0F0F',
    //     'card-bg': '#1A1A2A',
    //     'electric-purple': '#6A0DAD',
    //     'cool-aqua': '#40E0D0',
    //   },
    //   animation: {
    //     'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    //     'blob-slow': 'blob 10s infinite ease-in-out',
    //     'dash-flow': 'dash 3s linear infinite',
    //     'pulse-light': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    //   },
    //   keyframes: {
    //     blob: {
    //       '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
    //       '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
    //       '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
    //     },
    //     dash: {
    //       '0%': { 'stroke-dashoffset': '1000' },
    //       '100%': { 'stroke-dashoffset': '0' },
    //     },
    //   },
    // },

    extend: {
      colors: {
        'charcoal-dark': '#121212', // Main background
        'deep-bg': '#0F0F0F',      // Slightly darker for subtle separation if needed
        'card-bg': '#1A1A2A',      // Background for cards/modules
        'element-bg-dark': '#0D0D1A', // Even darker for internal elements like stats
        'electric-purple': '#6A0DAD', // Primary accent
        'cool-aqua': '#40E0D0',       // Secondary accent
      },
      fontFamily: {
        // Assuming you've imported Montserrat or a similar font
        // If not, remove this or replace with a default sans-serif: ['Montserrat', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'], // Example if you use Google Fonts or similar
        sans: ['Inter', 'sans-serif'], // Or 'Roboto', 'Lato', etc.
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob-slow': 'blob 10s infinite ease-in-out',
        'dash-flow': 'dash 3s linear infinite',
        'pulse-light': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite', // For CTA background
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        dash: {
          // Adjust 1000 to be longer than your SVG path length for a smooth flow
          '0%': { 'stroke-dashoffset': '0' },
          '100%': { 'stroke-dashoffset': '1000' },
        },
        // The default 'pulse' keyframe is usually built into Tailwind
        // If you want a custom pulse, you'd define it here.
        // For 'pulse-light' specifically, you might adjust opacity or scale.
      },
    },  
  },
  plugins: [require('@tailwindcss/forms')],
};
