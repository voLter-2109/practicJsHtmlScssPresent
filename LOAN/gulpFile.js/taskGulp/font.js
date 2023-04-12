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
//8/ уменьшение
const newer = require("gulp-newer");
const fonter = require("gulp-fonter");
// const ttf2woff2 = require("gulp-ttf2woff2");

// Обработка Fonts
const font = () => {
  return src(path.fonts.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "FONTS",
          message: error.message,
        })),
      })
    )
    .pipe(newer(path.fonts.dest))
    .pipe(fonter(app.fonter))
    .pipe(dest(path.fonts.dest));
  // .pipe(ttf2woff2())
  // .pipe(dest(path.fonts.dest));
};

module.exports = font;
