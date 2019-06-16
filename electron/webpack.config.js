module.exports = {
  entry: "./src/index.js",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  // devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
