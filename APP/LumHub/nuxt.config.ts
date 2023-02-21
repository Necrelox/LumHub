export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  app: {
    head: {
      charset: 'utf-16',
      title: 'LumHub',
      meta: [
        { name: 'description', content: 'My amazing site.' }
      ]
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true
  }
});
