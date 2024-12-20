const fs = require("fs");
const path = require("path");
const pngToIco = require("png-to-ico");

const buffer = fs.readFileSync("output.png");
pngToIco(buffer).then((icoBuffer) => {
  fs.writeFileSync("output.ico", icoBuffer);
});
