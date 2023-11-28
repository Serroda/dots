// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@vite-pwa/nuxt", "@pinia/nuxt"],
  ssr: false,
  css: [
    "assets/css/main.css"
  ],
  imports:{
    dirs:['./variables']
  },
  pwa: {
    registerType: "autoUpdate",
    workbox:{
      navigateFallback: null
    },
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
      title: "Dots by Jesús",
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
      meta: [{
        name: "theme-color",
        content: "#0D0D0D",
      }],
      viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    }
  }
})