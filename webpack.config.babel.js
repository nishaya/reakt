import webpack from 'webpack'
import path from 'path'
import config from 'config'

module.exports = {
  devServer: {
    contentBase: './public',
    port: config.WEBPACK_DEV_SERVER_PORT || 8080,
    historyApiFallback: true,
  },
}
