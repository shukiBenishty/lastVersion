
// Sample Webpack Configuration for Client Bundle
const baseConfig = require('./webpack.config');
const path = require('path');

module.exports = Object.assign({}, {
  entry: [
    './functions/fromGenerator/index.js'
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'client.form.bundle.js',
    path: path.resolve(__dirname, '../public/assets')
  }
},baseConfig);
