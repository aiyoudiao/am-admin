const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`SELECT
  t.table_name AS \`table_name\`,
  c.column_name AS \`column_name\`,
  c.column_comment AS \`column_comment\`
FROM
  information_schema.tables t
JOIN
  information_schema.columns c
  ON t.table_name = c.table_name
  AND t.table_schema = c.table_schema
WHERE
  t.table_schema = 'am-admin'  -- 替换为你实际的数据库名
  AND t.table_type = 'BASE TABLE'        -- 只查询实际的表，忽略视图
ORDER BY
  t.table_name, c.ordinal_position;       -- 按照表和列的位置排序
`;

  console.log('数据长度：', result.length);
  let count = 0;

  // 读取现有的 Prisma schema
  const schemaPath = './schema.prisma';
  let schema = fs.readFileSync(schemaPath, 'utf-8');
  // 遍历查询结果并在 Prisma schema 中添加注释
  result.forEach((row) => {
    const { table_name, column_name, column_comment } = row;
    if (column_comment) {
      const comment = `/// ${column_comment}`;
      const modelRegex = new RegExp(`model ${table_name} {([\\s\\S]*?)}`, 'g');
      debugger;
      schema = schema.replace(modelRegex, (match, content) => {
        count++;
        const columnRegex = new RegExp(`\\s+${column_name} ([^\\n]+)`);
        if (columnRegex.test(content)) {
          content = content.replace(columnRegex, (colMatch, colContent) => {
            return `
  ${comment}
  ${column_name} ${colContent}`;
          });
        }
        return `model ${table_name} {${content}}`;
      });
    }
  });

  console.log('更新了', count, '个字段的注释');
  fs.writeFileSync(schemaPath, schema);
  console.log('Prisma schema updated with comments.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
