const fs = require("fs");
const path = require("path");
const svg2img = require("svg2img");

svg2img("input.svg", { width: 50, height: 50 }, function (error, buffer) {
  fs.writeFileSync("output.png", buffer);
});
