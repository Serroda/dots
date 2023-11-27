// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@vite-pwa/nuxt"],
  ssr: false,
  css: [
    "assets/css/main.css"
  ],
  pwa:{
   registerType:'autoUpdate',
   manifest:{
    name: 'Dots by Jesús',
    short_name: 'Dots',
    description: 'Dots for play',
    theme_color: '#0D0D0D',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
   }
  },
  app: {
    baseURL: "/dots/",
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [{
        "name": "theme-color",
        "content": "#0D0D0D",
      }],
      viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    }
  }
})