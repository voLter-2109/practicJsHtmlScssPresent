"use strict";

// правила , как писать маски для выбора файлов
// выбрать несколько дерикторий для поиска файлов
// return src("./src/{html/html2}/*.html")
// ** -во всех вложенных фалах
// исключения , например все файлы кроме JS {"./src/**/*.*, !./src/**/*.js}

//Конфигурация
const path = require("./configTaskGulp/path.js");
const { watch, series, parallel } = require("gulp");
// 4/ browser-sync
const browserSync = require("browser-sync").create();

//задачи gulp
const clear = require("./taskGulp/clear.js");
const html = require("./taskGulp/html.js");
const css = require("./taskGulp/css.js");
// const scss = require("./taskGulp/scss.js");
const js = require("./taskGulp/js.js");
const img = require("./taskGulp/img.js");
const font = require("./taskGulp/font.js");

// сервер -browser-sync
const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root,
    },
  });
};

// наблюдатель, обновляет сборку после изменеия файлов
const watcher = () => {
  watch(path.html.watch, html).on("all", browserSync.reload);
  watch(path.css.watch, css).on("all", browserSync.reload);
  watch(path.js.watch, js).on("all", browserSync.reload);
  watch(path.img.watch, img).on("all", browserSync.reload);
  watch(path.fonts.watch, font).on("all", browserSync.reload);
  // watch(path.scss.watch, scss).on("all", browserSync.reload);
};

// задачи, раздельный вызов
exports.html = html;
exports.clear = clear;
exports.css = css;
// exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;

// сборка
module.exports.dev = series(
  clear,
  // parallel(html, js, img, font, scss),
  parallel(html, css, js, img, font),
  parallel(watcher, server)
);
