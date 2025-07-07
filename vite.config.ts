import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import CloudflarePagesFunctions from 'vite-plugin-cloudflare-functions';
import { imagetools } from 'vite-imagetools'
import inlineSource from "vite-plugin-inline-source";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact({
    prerender: {
      enabled: true,
      renderTarget: "#app"
    }
  }), imagetools(), CloudflarePagesFunctions({
    root: './functions',
    outDir: './dist',
    dts: './cloudflare.d.ts'
  }), inlineSource()],
  build: {
    cssCodeSplit: false
  }
})
