// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@vite-pwa/nuxt"],
  ssr: false,
  css: [
    "assets/css/main.css"
  ],
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      lang: "es",
      name: 'Dots by Jesús',
      short_name: 'Dots',
      description: 'Dots for play',
      theme_color: '#0D0D0D',
      background_color: "#0D0D0D",
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
      link: [{
        rel: "manifest",
        href: "/dots/manifest.webmanifest"
      }, {
        rel: "icon",
        type: "image/x-icon",
        href: "/dots/favicon.ico"
      }],
      title:"Dots by Jesús",
      viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    }
  }
})