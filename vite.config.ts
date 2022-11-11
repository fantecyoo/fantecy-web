import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

// https://vitejs.dev/config/
const url = "http://localhost:8000"
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@c": path.resolve(__dirname, "./src/components"),
      "@v": path.resolve(__dirname, "./src/views"),
      "@n": path.resolve(__dirname, "./src/network")
    }
  },
  server: {
    proxy: {
      "/api": {
        target: url
      }
    }
  }
})
