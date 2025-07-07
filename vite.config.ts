import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import CloudflarePagesFunctions from 'vite-plugin-cloudflare-functions';
import inlineSource from "vite-plugin-inline-source";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact({
    prerender: {
      enabled: true
    }
  }), CloudflarePagesFunctions({
    root: './functions',
    outDir: './dist',
    dts: './cloudflare.d.ts'
  }), inlineSource()],
  build: {
    cssCodeSplit: false
  }
})
