import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://github.com/JoePego/AMA",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Your Node.js backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
