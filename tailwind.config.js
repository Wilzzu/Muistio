/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#22242E",
				primaryHighlight: "#434E63",
				secondary: "#181A20",
				secondaryHighlight: "#282B36",
				accent: "#0793E3",
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
			boxShadow: {
				"centered-lg": "0 0 28px var(--tw-shadow-color)",
			},
		},
	},
	plugins: [tailwindScrollbar({ nocompatible: true, preferredStrategy: "pseudoelements" })],
};
