import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import './src/assets/scss/variables';`,
  //     },
  //   },
  // },
  plugins: [vue()],
})
