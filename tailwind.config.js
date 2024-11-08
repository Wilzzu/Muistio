/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";
import tailwindTypography from "@tailwindcss/typography";
import tailwindCss3d from "tailwindcss-3d";
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
				textAccent: "#21AEFF",
				background: "#11141A",
				text: "#EBE9FB",
				warning: "#FC605D",
			},
			fontFamily: {
				primary: ["Quicksand", "sans-serif"],
				placeholder: ["Flow Circular", "sans-serif"],
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
			dropShadow: {
				highlight: "0 0 10px var(--tw-shadow-color)",
				"text-sm": "0 1px 1px var(--tw-shadow-color)",
				"centered-base": "0 0 16px var(--tw-shadow-color)",
				"centered-lg": "0 0 24px var(--tw-shadow-color)",
				"centered-xl": "0 0 32px var(--tw-shadow-color)",
				"centered-2xl": "0 0 52px var(--tw-shadow-color)",
			},
			boxShadow: {
				"centered-sm": "0 0 14px var(--tw-shadow-color)",
				centered: "0 0 20px var(--tw-shadow-color)",
				"centered-lg": "0 0 28px var(--tw-shadow-color)",
			},
			keyframes: {
				"button-texture": {
					"0%": { transform: "translateX(150%) translateY(150%) scale(2)" },
					"100%": { transform: "translateX(-200%) translateY(-200%) scale(2)" },
				},
				"cloud-main": {
					"0%": { transform: "translateY(-128px) translateX(24px)" },
					"50%": { transform: "translateY(-150px) translateX(24px)" },
					"100%": { transform: "translateY(-128px) translateX(24px)" },
				},
				"cloud-main-mobile": {
					"0%": { transform: "translateY(-78px)" },
					"50%": { transform: "translateY(-100px)" },
					"100%": { transform: "translateY(-78px)" },
				},
				"cloud-left": {
					"0%": { transform: "translateY(0) translateX(0)" },
					"50%": { transform: "translateY(-8px) translateX(-8px)" },
					"100%": { transform: "translateY(0) translateX(0)" },
				},
				"cloud-right": {
					"0%": { transform: "translateX(0) translateY(0)" },
					"50%": { transform: "translateY(8px) translateX(-16px)" },
					"100%": { transform: "translateX(0) translateY(0)" },
				},
				underline: {
					"0%": { width: "0" },
					"100%": { width: "100%" },
				},
				"scroll-full-down": {
					"0%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(200%)" },
				},
				progress: {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0)" },
				},
			},
			animation: {
				"button-texture": "button-texture 5.5s linear infinite",
				"button-texture-start-middle": "button-texture 5.5s -2.75s linear infinite",
				"button-texture-fast": "button-texture 3s linear infinite",
				"button-texture-fast-start-middle": "button-texture 3s -1.6s linear infinite",
				"cloud-main": "cloud-main 6s ease-in-out infinite",
				"cloud-main-mobile": "cloud-main-mobile 6s ease-in-out infinite",
				"cloud-left": "cloud-left 7s 0.5s ease-in-out infinite",
				"cloud-right": "cloud-right 8s ease-in-out infinite",
				underline: "underline 1.5s cubic-bezier(.69,.05,.16,1)",
				"scroll-full-down": "scroll-full-down 6s linear infinite",
				"scroll-full-down-start-middle": "scroll-full-down 6s -3s linear infinite",
				progress: "progress 10s linear",
			},
			screens: {
				"3xl": "2000px",
			},
		},
	},

	plugins: [
		tailwindScrollbar({ nocompatible: true, preferredStrategy: "pseudoelements" }),
		tailwindTypography,
		tailwindCss3d,
	],
};
