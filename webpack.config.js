const path = require("path");

module.exports = {
  entry: [
    "./js/common.js",
    "./js/debounce.js",
    "./js/server.js",
    "./js/form.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/filter.js",
    "./js/image.js",
    "./js/map.js",
    "./js/move.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
