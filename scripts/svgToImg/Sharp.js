const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

sharp("input.svg")
  .resize(100, 100) // 设置尺寸
  .toFile("output.png", (err, info) => {
    if (err) throw err;
    console.log(info);
  });
