import glsl from 'vite-plugin-glsl';

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@vite-pwa/nuxt'],
  postcss: {
    plugins: {
      tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        exposeConfig: false,
        injectPosition: 0,
        viewer: true
      },
      autoprefixer: {}
    }
  },
  sourcemap: true,
  telemetry: false,
  ssr: true,
  app: {
    head: {
      charset: 'utf-8',
      title: 'LumHub',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'title',
          content: 'LumHub'
        },
        {
          name: 'description',
          content: 'Hub of many tools'
        }
      ]
    }
  },
  nitro: {
    preset: 'node-server'
  },
  vite: {
    plugins: [
      glsl({
        include: ['**/*.glsl', '**/*.vert', '**/*.frag'],
        compress: true,
        watch: false,
        defaultExtension: 'glsl',
        exclude: ['node_modules', 'bower_components', 'jspm_packages'],
        warnDuplicatedImports: true
      })]
  },
  pwa: {
    manifest: {
      name: 'LumHub',
      short_name: 'LumHub',
      description: 'Hub of many tools',
      icons: [
        {
          src: 'icon/64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'icon/144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: 'icon/192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icon/512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
});
