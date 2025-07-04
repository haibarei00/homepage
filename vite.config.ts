import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import CloudflarePagesFunctions from 'vite-plugin-cloudflare-functions';

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact(), CloudflarePagesFunctions({
    root: './functions',
    outDir: './dist',
    dts: './cloudflare.d.ts'
  })],
})
