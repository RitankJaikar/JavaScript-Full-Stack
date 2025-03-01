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
    port: 3001, // Runs on localhost:3001
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
      name: "remoteApp",  // Name of the remote application  
      filename: "remoteEntry.js", // Filename for the remote entry point, which will be used to expose modules
      // Modules that this remote application will expose to other applications
      exposes: {
        "./CounterApp": "./src/Components/Counter",
        "./TodoApp": "./src/Components/Todo"
      },
      // shared: ["react", "react-dom"],  //rhis has isssues, less control
      // Shared dependencies to avoid multiple versions of the same library being loaded
      shared: {
        react: {
          singleton: true,  // Ensures only one instance of react is used across applications
          requiredVersion: false, // Allows different versions without strict matching
          eager: true // Loads this module at build time instead of runtime, reducing load time but increasing bundle size
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