const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        // specifying html template file
        template: "./index.html",
        // outputing file name
        filename: "index.html"
      }),


      new WebpackPwaManifest({
        name: "PWA Text Editor",
        short_name: "PWA TE",
        description: "Text Editor",
        background_color: "#fff",
        crossorigin: "use-credentials",  //can be null
        icons: [
          {
            src: path.resolve("src/images/logo.png"),  //do not need ./ when providing path because of path.resolve()
            sizes: [96, 128, 192, 256, 384, 512]  //multiple sizes
          }
        ]
      }),


      new InjectManifest({
        swSrc: "./src-sw.js",  //specifying our service worker file
        swDest: "service-worker.js"  //the asset name of the service worker file that will be created by this plugin
      }),
      
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },

        {
          test: /\.js$/,
          exclude: /node_modules/,

          use: {
            loader: "babel-loader",
            
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        }
        
      ],
    },
  };
};
