const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = {
  //1. Entry Point
  entry: "./src/index.js", // Entry point of your app

  //2. Output Settings
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // Cleans old files in the dist folder
  },

  //3. Development or Production
  mode: "development", // Change to "production" for optimized build

  //4. Development Server
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3000, // Runs on localhost:3000
    hot: true, // Enables Hot Module Replacement
    open: true, // Opens browser automatically
  },

  //5. Module Processing
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Support both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, // Handles CSS files
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // Handles image files
        type: "asset/resource",
      },
    ],
  },

  //6. Plugins
  plugins: [
    new ModuleFederationPlugin({
      name: "hostApp",  // Name of the host application that will consume remote modules
      // Remote applications that this host will consume
      remotes: {
        // Defining "remoteApp" and specifying its entry point
        // "remoteApp" is the name used to reference this remote application
        "remoteApp": "remoteApp@http://localhost:3001/remoteEntry.js"
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: false,
          eager: true
        },
        "react-dom": {
          singleton: true,
          requiredVersion: false,
          eager: true
        }
      }
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html", // Uses custom HTML template
      filename: "index.html",
    }),
  ],

  //7. Resolve
  resolve: {
    extensions: [".js", ".jsx", ".css"], // Allows importing files without specifying extensions
  },
};