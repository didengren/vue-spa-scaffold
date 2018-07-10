const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

var skeOurputDir
switch (process.env.NODE_ENV) {
  case 'ske_dev':
    skeOurputDir = 'distDev'
    break;
  case 'ske_test':
    skeOurputDir = 'distTest'
    break;
  case 'ske_prod':
    skeOurputDir = 'dist'
    break;
  default:
    break;
}

module.exports = {
  target: 'node',
  entry: {
    skeleton: './src/main-skeleton.js'
  },
  output: {
    path: path.resolve(__dirname, '../' + skeOurputDir),
    publicPath: '/' + skeOurputDir + '/',
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new VueSSRServerPlugin({
      filename: 'skeleton.json'
    })
  ]
}