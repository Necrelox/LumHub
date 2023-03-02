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
      charset: 'utf-16',
      title: 'LumHub',

      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
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
    registerType: 'autoUpdate',
    mode: 'development',
    client: {
      installPrompt: true
    },
    manifest: {
      name: 'Nuxt Vite PWA',
      short_name: 'NuxtVitePWA',
      theme_color: '#ffffff'
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
});
