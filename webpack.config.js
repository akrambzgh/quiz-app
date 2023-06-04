const path = require("path");

module.exports = {
  entry: "./app/src/ts/app.ts",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "./app/src/js"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
