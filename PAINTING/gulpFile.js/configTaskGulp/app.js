"use strict";

module.exports = {
  htmlmin: {
    collapseWhitespace: true, //убирает из разметки лишние пробелы
  },

  webpack: {
    mode: "development",
  },

  imagemin: {
    verbose: true,
  },

  fonter: {
    formats: ["ttf", "woff", "eot", "svg"],
  },
};
