
// Sample Webpack Configuration for Client Bundle
const baseConfig = require('./webpack.config');
const path = require('path');

module.exports = Object.assign({}, {
  entry: [
    './containers/ClientApp.jsx'
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, '../public/assets')
  }
},baseConfig);
