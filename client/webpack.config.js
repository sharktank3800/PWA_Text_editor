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
        title: "index.html"
      }),

      new InjectManifest({
        swSrc: "./src-sw.js",  //specifying our service worker file
        swDest: "src-sw.js"  //the asset name of the service worker file that will be created by this plugin
      }),


      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "PWA Text Editor",
        short_name: "J.A.T.E",
        description: "Offline Text Editor",
        background_color: "#F4DFC8",
        theme_color: "#225ca5",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),  //do not need ./ when providing path because of path.resolve()
            sizes: [96, 128, 192, 256, 384, 512],  //multiple sizes
            destination: path.join("assets", "icons")
          }
        ]
      })
      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },

        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },

        {
          test: /\.m?js$/,
          exclude: /node_modules/,

          use: {
            loader: "babel-loader",
            
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            }
          }
        }
        
      ],
    },
  };
};
