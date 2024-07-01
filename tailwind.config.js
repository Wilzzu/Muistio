/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#22242E",
				primaryHighlight: "#434E63",
				secondary: "#181A20",
				secondaryHighlight: "#282B36",
				accent: "#EBB026",
				background: "#11141A",
				text: "#EBE9FB",
			},
			fontFamily: {
				primary: ["Quicksand", "sans-serif"],
				note: ["Noto Sans", "sans-serif"],
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
			dropShadow: {
				highlight: "0 0 10px var(--tw-shadow-color)",
			},
		},
	},
	plugins: [],
};
