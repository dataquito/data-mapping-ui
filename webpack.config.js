'use strict';
var path      = require('path');
var webpack   = require('webpack');

// 1. Debug    [bd604d99e75e45d38bc7ac8fc714cde0097d901f]
// 2. DevTool  [3baaa97f47149759b6623684baf7dd794a708f3a]
// 3. Target   [61ad50a9b9189cc3cf1874568e35e7901ff4c982]
// 4. Entry    [19172e9e47fee4109f3d1d86c3076acdc36822f2]
// 5. Output   [4bed336194a9a5c86b6a734f03b3570d2aae1a68]
// 6. Resolve  [ac7f958cc028becfb4b2bec9c474bd2d5e8b6095]
// 7. Module   [b8ff02892916ff59f7fbd4e617fccd01f6bca576]

module.exports = function(options) {
  // Stylesheets loaders
  var browsers = { 
    browsers: [
      'last 2 version',
      'ie >= 10'
    ] 
  };
  var stylesheetLoaders = {
    'css': 'css-loader!autoprefixer-loader?' + JSON.stringify(browsers)
  };
  // Resolve config
  var modulesDirectories = ['node_modules'];
  var aliases = {};

  // Output config
  var publicPath = options.devServer ? 'http://localhost:8090/application/' : 'application/';
  var output = {
    path: path.join(__dirname, 'application'),
    publicPath: publicPath,
    filename: '[name].js' + (options.longTermCaching ? '?[chunkhash]' : ''),
    chunkFilename: (options.devServer ? '[id].js' : '[name].js') + (options.longTermCaching ? '?[chunkhash]' : ''),
    sourceMapFilename: 'debugging/[file].map',
    pathinfo: options.debug
  };
  // JS Plugings
  var plugins = [
    new webpack.PrefetchPlugin('react')
  ];

  // Optimize settings for JS
  if (options.optimize) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') }}),
      new webpack.NoErrorsPlugin()
    );
  }

  return {
    debug: true,            // [bd604d99e75e45d38bc7ac8fc714cde0097d901f]
    devtool: 'source-map',  // [3baaa97f47149759b6623684baf7dd794a708f3a]
    target: 'web',          // [61ad50a9b9189cc3cf1874568e35e7901ff4c982]
    entry: {                // [19172e9e47fee4109f3d1d86c3076acdc36822f2]
      application: path.join(__dirname, 'application/scripts/main.js')
    },
    output: output,         // [4bed336194a9a5c86b6a734f03b3570d2aae1a68]
    resolve: {              // [ac7f958cc028becfb4b2bec9c474bd2d5e8b6095]
      root: __dirname,
      modulesDirectories: modulesDirectories,
      alias: aliases
    },
    module: {               // [b8ff02892916ff59f7fbd4e617fccd01f6bca576]
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          stage: 0,
          plugins: []
        }
      }]
    }
  };
}();
