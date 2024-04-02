import { fileURLToPath, URL } from "node:url"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

/*
|------------------------------------
|  Vite configuration 🛠️
|------------------------------------
|
|
*/
export default defineConfig({
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 1600
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./source", import.meta.url))
        }
    }
})