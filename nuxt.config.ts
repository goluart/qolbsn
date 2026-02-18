// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Load our CSS file
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Blade & Soul NEO - Tools & Resources',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A collection of tools and resources for Blade & Soul NEO players.' }
      ]
    }
  }
})
