const nodeExternals = require('webpack-node-externals')
const resolve = (dir) => require('path').join(__dirname, dir)

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'ori-comunity',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'The site for the oriflame\'s people.'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Material+Icons|Roboto:300,400,500,700&amp;subset=cyrillic'
      }
    ]
  },
  plugins: ['~/plugins/vuetify.js', '~/filters/formateDate.js'],
  css: [
    '~/assets/style/app.styl',
    '~/assets/sass/main.sass',
  ],
  mode: "spa",
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    babel: {
      plugins: [
        ["transform-imports", {
          "vuetify": {
            "transform": "vuetify/es5/components/${member}",
            "preventFullImport": true
          }
        }]
      ]
    },
    vendor: [
      '~/plugins/vuetify.js',
      '~/plugins/vue-resource.js',
      '~/plugins/globalComponents.js'
    ],
    plguins: [{
      src: '~/plugins/vue-resource.js',
      ssr: false
    }],
    extractCSS: true,
    /*
     ** Run ESLint on save
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            formatter: require('eslint-friendly-formatter'),
            fix: true
          }
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/, /^vue-resource/]
          })
        ]
      }
    }
  }
}
