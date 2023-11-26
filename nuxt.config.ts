// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@unocss/nuxt"],
  ssr: false,
  css: [
    "assets/css/main.css"
  ],
  app: {
    baseURL: "/dots/"
  }
})