"use strict";

//Конфигурация
const path = require("../configTaskGulp/path.js");  

// 7/ удаление файлов из директории dist, при повторном вызове сборщика
const del = require("del");

// удаление файлов из директории dist, при повторном вызове сборщика
const clear = () => {
  return del(path.root);
};

module.exports = clear;