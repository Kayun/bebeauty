import webpack from 'webpack';
import WebpackNotifierPlugin from 'webpack-notifier';
import path from 'path';

const NODE_ENV = global.process.env.NODE_ENV || 'development';

export default {

  context: path.join(__dirname, 'src/scripts'),
  entry: {
    common: './common.js'
    // test: 'mocha!../../test/index.js'
  },

  output: {
    path: __dirname + '/public/assets/scripts',
    filename: '[name].js'
  },

  watch: NODE_ENV === 'development',

  resolve: {
    modulesDirectories: [
      'node_modules',
      'src/scripts'
    ],
    root: [
      path.join(__dirname, 'src/scripts'),
      path.join(__dirname, 'src/templates')
    ],
    extensions: ['', '.js', '.jade'],
    alias: {
      'chai-jquery': 'chai-jquery/chai-jquery.js'
    }
  },

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: NODE_ENV === 'development' ? 'inline-source-map' : null,

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
          // plugins: ['transform-runtime']
        }
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        test: /\.jade$/,
        loader: 'jade'
      }
    ],
    noParse: [
      path.join(__dirname, 'src/scripts/namespace')
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'underscore',
      Backbone: 'backbone',
      Marionette: 'backbone.marionette'
    }),
    new WebpackNotifierPlugin({
      title: 'Webpack',
      alwaysNotify: true
    })
  ],

  eslint: {
    configFile: path.join(__dirname, '.eslintrc'),
    emitError: true,
    emitWarning: true
  }
};
