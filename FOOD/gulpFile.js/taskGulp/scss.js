"use strict";

//Конфигурация
const path = require("../configTaskGulp/path.js");
const app = require("../configTaskGulp/app.js");

const { src, dest } = require("gulp");

// плагины
const sass = require("gulp-sass")(require("sass"));
// 5/ обработка ошибок в процессе сборки
const plumber = require("gulp-plumber");
// 6/ позволяет создавать различные вплывающие сообщения об ошибках
const notify = require("gulp-notify");
//5/ создать карту
const sourcemaps = require("gulp-sourcemaps");
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
// 11/ группировка медиа запросов
const groupCssMediaQueries = require("gulp-group-css-media-queries");
//12 / подключить другие файлы в один @media
const sassGlob = require("gulp-sass-glob");

// Обработка scss
const scss = () => {
  return src(path.scss.src)
    .pipe(sourcemaps.init())
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "scss",
          message: error.message,
        })),
      })
    )
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(shorthand())
    .pipe(groupCssMediaQueries())
    .pipe(size({title: "main.css"}))
    .pipe(dest(path.scss.dest))
    .pipe(rename({suffix: ".min"}))
    .pipe(csso())
    .pipe(size({title: "main.css"}))
    .pipe(sourcemaps.write())
    .pipe(dest(path.scss.dest));
};

module.exports = scss;
