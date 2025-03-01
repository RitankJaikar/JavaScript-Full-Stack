Custom React App

- npm i webpack webpack-cli webpack-dev-server html-webpack-plugin -D
webpack – Bundles your JavaScript files and assets
webpack-cli – Allows you to run Webpack commands from the terminal
webpack-dev-server – Provides a local development server with live reloading
html-webpack-plugin – Generates an index.html file and injects your bundled scripts automatically
All these are dev dependencies

- npm i react react-dom
For all react functionality

- npm i @babel/core @babel/preset-env @babel/preset-react babel-loader -D
@babel/core → The main Babel compiler
@babel/preset-env → Converts modern JavaScript (ES6+) to browser-compatible JS
@babel/preset-react → Transforms JSX into JavaScript
babel-loader → Integrates Babel with Webpack

- npm install --save-dev style-loader css-loader



/Custom-React-App
 ├── /public
 │    ├── index.html
 ├── /src
 │    ├── index.js
 │    ├── style.css
 ├── package.json
 ├── webpack.config.js
 ├── .babelrc

- package.json
```js
"scripts": {
    "start": "webpack serve --config webpack.config.js",  // Starts the dev server using webpack.config.js
    "build": "webpack --config webpack.config.js"         // Builds the production-ready files
}
```

- webpack.config.js
```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Uses custom HTML template
      filename: "index.html",
    }),
  ],

  //7. Resolve
  resolve: {
    extensions: [".js", ".jsx", "css"], // Allows importing files without specifying extensions
  },
};
```

- .babelrc
```js
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```