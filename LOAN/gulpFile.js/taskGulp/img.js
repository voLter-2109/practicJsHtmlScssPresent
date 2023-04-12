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
//7/ уменьшает размер изображений
const imagemin = require("gulp-imagemin");
//8/ уменьшение только новых фото
const newer = require("gulp-newer");
// 9/ сжатие фото(формат webp, уточнить почему ломается скрипт, записывать через pictures)
const webp = require("gulp-webp");

// Обработка Image
const img = () => {
  return src(path.img.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "IMG",
          message: error.message,
        })),
      })
    )
    .pipe(newer(path.img.dest))
    .pipe(webp())
    .pipe(dest(path.img.dest))
    .pipe(src(path.img.src))
    .pipe(newer(path.img.dest))
    .pipe(imagemin(app.imagemin))
    .pipe(dest(path.img.dest));
};

module.exports = img;
