import theme from '@nuxt/content-theme-docs'

// 参考配置：https://github.com/nuxt/content/blob/main/packages/theme-docs/src/index.js

export default theme({
  head: {
    title: 'YoMo!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'twitter:description', name: 'twitter:description', content: 'YoMo is an open-source Streaming Serverless Framework for building low-latency edge computing applications.' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Exo+2:wght@400&display=swap' }
    ],
  },
  docs: {
    primaryColor: '29, 78, 216'
  },
  loading: { color: '#00CD81' },
  i18n: {
    locales: () => [{
      code: 'zh',
      iso: 'zh-CN',
      file: 'zh-CN.js',
      name: '简体中文'
    }, {
      code: 'en',
      iso: 'en-US',
      file: 'en-US.js',
      name: 'English'
    }],
    defaultLocale: 'en'
  },
  buildModules: [
    ['@nuxtjs/google-analytics', { id: 'UA-47208480-12' }],
  ],
  googleFonts: {
    families: {
      'DM+Sans': false,
      'DM+Mono': false
    }
  },
  css: [
    './assets/css/main.css'
  ],
})
