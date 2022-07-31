import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'spf',
      fileName: (format) => `spf.${format}.js`
    },
    rollupOptions: {
      external: ['vue', '@polkadot/api', 'web3'],
      output: {
        globals: {
          'vue': 'Vue',
          '@polkadot/api': '@polkadot/api',
          'web3': 'web3'
        }
      }
    }
  },
  resolve: {
    alias: {
      web3: 'web3/dist/web3.min.js'
    }
  }
})
