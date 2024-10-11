import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		Sitemap({
			hostname: "https://muistio.wilzzu.dev",
			dynamicRoutes: ["/", "/terms-of-service", "/privacy-policy"],
		}),
	],
	base: "/",
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return id.toString().split("node_modules/")[1].split("/")[0].toString();
					}
				},
			},
		},
	},
});
