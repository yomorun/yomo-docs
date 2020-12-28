export default {
  repository: 'https://github.com/10cella/yomo-docs',
  docsRepository: 'https://github.com/10cella/yomo-docs',
  branch: 'master',
  path: '/',
  titleSuffix: '',
  nextLinks: true,
  prevLinks: true,
  search: false,
  customSearch: false,
  darkMode: false,
  footer: true,
  footerText: <>© {new Date().getFullYear()} CELLA, Inc. All rights reserved.</>,
  footerEditOnGitHubLink: false,
  logo: <>
    <span>
      <img src="/favicon.ico"/>
      <b>YoMo</b> Streaming Serverless Framework</span>
        <style jsx>{
              `{
                img{
                  display:inline-block;
                  width:2rem;
                  margin-right:1rem;
                }
              }`
      }
  </style>
  </>,
  head: <>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="YoMo is an open-source Streaming Serverless Framework for building low-latency edge computing applications. Built atop QUIC transport protocol and functional reactive programming interface, it makes real-time data processing reliable, secure, and easy." />
    <link rel="icon" type="image/png" href="/favicon.ico"/>
  </>,
  i18n: [
    { locale: 'en', text: 'English' },
    { locale: 'zh', text: '简体中文' }
  ]
}
