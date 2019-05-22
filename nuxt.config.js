module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'stroyka',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/assets/styles/main.css',
    '~/assets/styles/bootstrap-4.3.1-dist/css/bootstrap-grid.css',
    '~/assets/styles/bootstrap-4.3.1-dist/css/bootstrap.css',
  ],
  js: [
    '~/assets/styles/bootstrap-4.3.1-dist/js/bootstrap.bandle.js',
    '~/assets/styles/bootstrap-4.3.1-dist/js/bootstrap.js'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Customize server config
  */
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

