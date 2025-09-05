/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(220 78% 97%)",
        foreground: "hsl(220 47% 27%)",
        primary: "hsl(220 89.8% 46.1%)",
        accent: "hsl(218, 92%, 56%)",
        border: "hsl(220 47% 87%)",
        surface: "hsl(0 0% 100%)",
        dark: {
          background: "hsl(222 84% 4.9%)",
          surface: "hsl(217 32.6% 17.5%)",
          foreground: "hsl(210 40% 98%)",
          border: "hsl(217 32.6% 17.5%)",
        }
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
      },
      spacing: {
        sm: "8px",
        md: "12px",
        lg: "20px",
        xl: "32px",
      },
      boxShadow: {
        card: "0 4px 16px hsla(0, 0%, 0%, 0.06)",
        modal: "0 12px 32px hsla(0, 0%, 0%, 0.12)",
      },
      animation: {
        'fade-in': 'fadeIn 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}