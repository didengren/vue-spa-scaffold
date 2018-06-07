var path = require('path')
var utils = require('./utils')

var projectRoot = path.resolve(__dirname, '../')
// const vuxLoader = require('vux-loader')

var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var matchEP = require('../config/matchEnvPub')
var entryDir = process.env.NODE_ENV === 'development' ?
  './src/main.js' :
  './src/main-build.js'

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

let webpackConfig = {
  entry: {
    app: entryDir
  },
  output: {
    path: matchEP.subProp().assetsRoot,
    filename: '[name].js',
    publicPath: matchEP.matchEnvPub() // process.env.NODE_ENV === 'production'
      ? matchEP.subProp().assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
  // performance: {
  //   hints: 'warning'
  // }
}

module.exports = webpackConfig
// module.exports = vuxLoader.merge(webpackConfig, {
//   plugins: ['vux-ui', 'progress-bar', 'duplicate-style', {
//     name: 'less-theme',
//     path: 'src/assets/vux-theme.less'
//   }]
// })
