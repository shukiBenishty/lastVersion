var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var cssName = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';

var jsName = 'bundle.js';

var BUILD_DIR = path.resolve(__dirname, 'assets');


module.exports = {
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      'firebase-database': path.resolve(__dirname, '../functions/firebase-database'),
    }
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, "./node_modules")],
  },
      module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
           test: /\.(scss)$/,
           use: [{
             loader: 'style-loader', // inject CSS to page
           }, {
             loader: 'css-loader', // translates CSS into CommonJS modules
           }, {
             loader: 'postcss-loader', // Run post css actions
             options: {
               plugins: function () { // post css plugins, can be exported to postcss.config.js
                 return [
                   require('precss'),
                   require('autoprefixer')
                 ];
               }
             }
           }, {
             loader: 'sass-loader' // compiles Sass to CSS
           }]
         },
        {
          test: /\.css$/,
           loader: ExtractTextPlugin.extract({
                loader: 'css-loader',
                query: {
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                  modules: true
                }
              })
        },
        { test: /\.(woff|woff2|ttt|eot|otf)/, loader: 'url-loader?limit=1' },
        {
          test: /\.png/,
          //loader: 'url-loader?limit=10000&mimetype=image/png',
          loader: 'file-loader',
          query: {
            name: 'images/[hash].[ext]',
            publicPath: '/'
          }
        },
        { test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=svg+xml' }
      ]
    },
    devServer: {
        headers: { 'Access-Control-Origin': '*'}
    },
    plugins: [    
      new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
      new ExtractTextPlugin({
        filename: 'styles.css',
        allChunks: true
      })
    ]

  };


//
//   new webpack.optimize.UglifyJsPlugin({
//   include: /\.min\.js$/,
//   minimize: true
// }),
