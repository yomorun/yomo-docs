import theme from '@nuxt/content-theme-docs'

export default theme({
  head: {
    title: 'YoMo!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'twitter:description', name: 'twitter:description', content: 'YoMo is an open-source Streaming Serverless Framework for building low-latency edge computing applications.'},
    ],
    script: [
      { src: '/dissect-tracker.js', body: true },
    ]
  },
  docs: {
    primaryColor: '#E24F55'
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
    ['@nuxtjs/google-analytics', { id: 'UA-47208480-12'}],
  ]
})
