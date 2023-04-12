"use strict";

//Конфигурация
const path = require("../configTaskGulp/path.js");
const app = require("../configTaskGulp/app.js");

const { src, dest } = require("gulp");

// плагины
// 1/ соездиняет html в один
const fileInclude = require("gulp-file-include");
// 2/ удаляет все лишнее html
const htmlmin = require("gulp-htmlmin");
// 3/ сжимает размер html
const size = require("gulp-size");
// 5/ обработка ошибок в процессе сборки
const plumber = require("gulp-plumber");
// 6/ позволяет создавать различные вплывающие сообщения об ошибках
const notify = require("gulp-notify");



// Обработка html
const html = () => {
  return src(path.html.src )
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "HTML",
          message: error.message,
        })),
      })
    )
    .pipe(fileInclude())
    .pipe(size({ title: "до сжатия" }))
    .pipe(htmlmin(app.htmlmin))
    .pipe(size({ title: "до сжатия" }))
    .pipe(dest(path.html.dest));
};

module.exports = html;
