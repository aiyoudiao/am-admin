const fs = require('fs');
const path = require('path');

// 递归遍历目录，查找所有 .js 文件
const readDirectory = (dirPath) => {
  const result = [];

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      result.push(...readDirectory(fullPath)); // 递归子目录
    } else if (stat.isFile()) {
      result.push(fullPath);
    }
  });

  return result;
};

// 替换文件中的注释格式
const replaceCommentFormat = (filePath) => {
  let data = fs.readFileSync(filePath, 'utf8');

  // 正则匹配注释块并提取 @Description 内容
  const regex = /\/\*([\s\S]*?)\*\/\s*/g;
  const newData = data.replace(regex, (match, commentBlock) => {
    const descriptionMatch = commentBlock.match(
      /@Description:\s*(.*?)\s*(?:\*\/|\n|$)/,
    );

    if (descriptionMatch) {
      const description = descriptionMatch[1].trim();
      return `/*
 * @Description: ${description}
 */

\n`;
    }

    return match; // 如果没有匹配到 @Description，就保留原样
  });

  if (newData !== data) {
    fs.writeFileSync(filePath, newData, 'utf8');
    console.log(`已更新文件: ${filePath}`);
  }
};

// 主程序
const projectPath = './'; // 替换为你的项目路径

const files = readDirectory(projectPath);

files.forEach((file) => {
  replaceCommentFormat(file); // 处理每个文件
});
