// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server:{
//     port:5000,
//     proxy:{
//       "/api":{
//         target:"http://localhost:4001",
//       }
//     }
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      "/api": {
        target: "http://localhost:4001",
      }
    },
    host: '0.0.0.0', // Set to '0.0.0.0' to make the server accessible from all network interfaces
    open: true // Automatically open the default browser when the server starts
  },
})
