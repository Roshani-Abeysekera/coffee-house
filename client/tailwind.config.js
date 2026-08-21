/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Core brand — deep roasted espresso, not muddy brown
                coffee: "#3D2A1E",
                espresso: "#241610",
                // Warm ivory background, refined off-white
                cream: "#F6F0E6",
                paper: "#FCFAF6",
                // Signature accent — burnt copper/terracotta, not literal "gold"
                gold: "#BE6A3A",
                clay: {
                    50: "#FAEDE4",
                    100: "#F3D8C4",
                    200: "#E7B48E",
                    300: "#D99461",
                    400: "#C97C46",
                    500: "#BE6A3A",
                    600: "#A2532A",
                    700: "#7E4020",
                    800: "#5C2E17",
                    900: "#3E1E0F",
                },
                ink: "#241610",
                muted: "#8A7563",
                brown: {
                    50: "#FAF4EC",
                    100: "#F0E1CE",
                    200: "#DDBE9C",
                    300: "#C79A6C",
                    400: "#A97748",
                    500: "#8A5C34",
                    600: "#6E4728",
                    700: "#4E331E",
                    800: "#372316",
                    900: "#241610",
                },
            },
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
                display: ["Fraunces", "ui-serif", "Georgia", "serif"],
            },
            letterSpacing: {
                tightest: "-0.04em",
            },
            boxShadow: {
                soft: "0 2px 10px -2px rgba(36,22,16,0.08)",
                card: "0 8px 30px -10px rgba(36,22,16,0.18)",
                lift: "0 20px 45px -15px rgba(36,22,16,0.35)",
            },
            backgroundImage: {
                grain: "radial-gradient(circle at 1px 1px, rgba(246,240,230,0.06) 1px, transparent 0)",
            },
        },
    },
    plugins: [],
}
