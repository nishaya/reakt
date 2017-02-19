import webpack from 'webpack'
import path from 'path'
import config from 'config'

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    PORT_CONFIG: JSON.stringify(config),
  }),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ compress: { drop_debugger: true, drop_console: true } }),
  )
}

module.exports = {
  entry: './src/application.jsx',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'application.js',
  },
  plugins,
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /application\.s[ac]ss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
    ],
  },
  devServer: {
    contentBase: './docs',
    port: config.WEBPACK_DEV_SERVER_PORT || 8080,
    historyApiFallback: true,
  },
}
