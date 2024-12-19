const fs = require("fs");
const path = require("path");

// 获取当前目录下的所有文件和子目录
function renameFilesInDirectory(directory) {
  // 排除 node_modules 目录
  if (path.basename(directory) === "node_modules") {
    return;
  }

  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`读取目录失败: ${err.message}`);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);

      // 检查是否是文件夹，如果是文件夹，递归处理
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`获取文件状态失败: ${err.message}`);
          return;
        }

        if (stats.isDirectory()) {
          // 如果是目录，递归处理
          renameFilesInDirectory(filePath);
        } else {
          // 如果是文件，检查文件名是否以 xxx_ 开头
          if (file.startsWith("xxx_")) {
            const newFileName = "am_" + file.slice(4); // 将 xxx_ 替换为 am_
            const newFilePath = path.join(directory, newFileName);

            // 重命名文件
            fs.rename(filePath, newFilePath, (err) => {
              if (err) {
                console.error(`重命名失败: ${err.message}`);
              } else {
                console.log(`文件重命名成功: ${filePath} -> ${newFilePath}`);
              }
            });
          }
        }
      });
    });
  });
}

// 获取当前目录
const currentDirectory = process.cwd();
renameFilesInDirectory(currentDirectory);
