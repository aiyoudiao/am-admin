const fs = require('fs');
const path = require('path');

// 要处理的文件夹路径
const directoryPath = path.join(__dirname, 'your_project_directory');

// 处理文件内容
function processFileContent(content) {
  const regex =
    /\/\*\s*\*\s*@Description:.*?\n\s*\*\s*\n\s*\*\s*@Version:.*?\n\s*\*\s*@Author:.*?\n\s*\*\s*@Date:.*?\n\s*\*\s*@LastEditors:.*?\n\s*\*\s*@LastEditTime:.*?\n\s*\*\//gs;
  return content.replace(regex, (match) => {
    const descriptionMatch = match.match(/@Description:.*?\n/);
    return `/*\n * ${descriptionMatch[0].trim()}\n */`;
  });
}

// 处理单个文件
function processFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`读取文件出错: ${filePath}`, err);
      return;
    }

    // 检查文件是否已经处理过
    if (data.includes('/*\n * @Description:')) {
      console.log(`文件已处理，跳过: ${filePath}`);
      return;
    }

    const newContent = processFileContent(data);

    fs.writeFile(filePath, newContent, 'utf8', (err) => {
      if (err) {
        console.error(`写入文件出错: ${filePath}`, err);
      } else {
        console.log(`处理文件成功: ${filePath}`);
      }
    });
  });
}

// 遍历目录
function traverseDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`读取目录出错: ${directory}`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`获取文件信息出错: ${filePath}`, err);
          return;
        }

        if (stats.isDirectory()) {
          traverseDirectory(filePath);
        } else if (stats.isFile() && path.extname(file) === '.ts') {
          processFile(filePath);
        }
      });
    });
  });
}

// 开始处理
traverseDirectory('./');
