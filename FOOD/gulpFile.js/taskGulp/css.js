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

//3 / обьединение файлов css
const concat = require("gulp-concat");
//4/ возможность использовать "import" в css файлах
const cssimport = require("gulp-cssimport");

const sourceMap = require("gulp-sourcemaps");
//6/ добавляет префиксы для разных браузерв , задается в файле pacage.json
const autoprefixer = require("gulp-autoprefixer");
//7/ сжать файл css
const csso = require("gulp-csso");
//8/
const rename = require("gulp-rename");
//9/
const size = require("gulp-size");
//10/ заменяет все возможные свойста на их краткие версии
const shorthand = require("gulp-shorthand");

// Обработка css
const css = () => {
  return (
    src(path.css.src)
      .pipe(
        plumber({
          errorHandler: notify.onError((error) => ({
            title: "css",
            message: error.message,
          })),
        })
      )
      .pipe(sourceMap.init())
      .pipe(concat("main.css"))
      .pipe(cssimport())
      .pipe(autoprefixer())
      // .pipe(shorthand())
      // .pipe(size({ title: "main.css" }))
      // .pipe(dest(path.css.dest))
      // .pipe(rename({ suffix: ".min" }))
      // .pipe(csso())
      // .pipe(size({ title: "main.css" }))
      .pipe(sourceMap.write())
      .pipe(dest(path.css.dest))
  );
};

module.exports = css;
