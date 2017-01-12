import webpack from 'webpack'
import path from 'path'
import config from 'config'

module.exports = {
  entry: './src/application.jsx',
  output: {
    path: './public',
    filename: 'application.js',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] },
    ],
  },
  devServer: {
    contentBase: './public',
    port: config.WEBPACK_DEV_SERVER_PORT || 8080,
    historyApiFallback: true,
  },
}
