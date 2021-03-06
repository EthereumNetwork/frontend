
const { join } = require('path')

module.exports = {
  build: {
    vendor: ['axios', 'marked', 'qrcode-js-package/qrcode.js', 'socket.io-client', 'vuetify', 'vue-cookie', 'vue-infinite-loading', 'wenk']
  },
  plugins: ['~plugins/vuetify.js', '~plugins/vue-cookie.js'],
  css: [
    { src: join(__dirname, 'css/app.styl'), lang: 'styl' },
    { src: join(__dirname, 'css/fontello-embedded.css')}
  ],
  cache: true,
  head: {
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },
  env: {
    HOST_URL: process.env.HOST_URL || 'http://localhost:3001'
  }
}
