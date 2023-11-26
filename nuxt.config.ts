// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@unocss/nuxt"],
  ssr: false,
  css: [
    "assets/css/main.css"
  ],
  app: {
    baseURL: "/dots/",
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [{
        "name": "theme-color",
        "content": "#0D0D0D"
      }]
    }
  }
})