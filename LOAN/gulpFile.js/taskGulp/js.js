"use strict";

//Конфигурация
const path = require("../configTaskGulp/path.js");
const app = require("../configTaskGulp/app.js");

const { src, dest } = require("gulp");

// плагины
// 5/ обработка ошибок в процессе сборки
const plumber = require("gulp-plumber");
// 6/ позволяет создавать различные вплывающие сообщения об ошибках
const notify = require("gulp-notify");
//5/ создать карту
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const webpack = require("webpack-stream");

// Обработка JavaScript
const js = () => {
  return src(path.js.src)
    .pipe(sourcemaps.init())
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "JavaScript",
          message: error.message,
        })),
      })
    )
    .pipe(babel())
    .pipe(webpack(app.webpack))
    .pipe(sourcemaps.write())
    .pipe(dest(path.js.dest));
};

module.exports = js;
