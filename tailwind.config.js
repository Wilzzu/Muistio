/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";
import tailwindTypography from "@tailwindcss/typography";
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
				warning: "#FC605D",
			},
			fontFamily: {
				primary: ["Quicksand", "sans-serif"],
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
			dropShadow: {
				highlight: "0 0 10px var(--tw-shadow-color)",
				"text-sm": "0 1px 1px var(--tw-shadow-color)",
			},
			boxShadow: {
				"centered-sm": "0 0 14px var(--tw-shadow-color)",
				centered: "0 0 20px var(--tw-shadow-color)",
				"centered-lg": "0 0 28px var(--tw-shadow-color)",
			},
		},
	},

	plugins: [
		tailwindScrollbar({ nocompatible: true, preferredStrategy: "pseudoelements" }),
		tailwindTypography,
	],
};
