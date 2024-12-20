# am-admin/backend


## 前置依赖

node >= 20

pnpm >= 9.8.0

## 使用步骤

1.安装 docker 和 docker-compose

2. 安装依赖，启动项目
```bash
pnpm install
pnpm run docker:base
pnpm run dev
```

## 调整菜单路径的片段

如果乱挪移菜单位置，可能需要调整菜单路径的片段，以下 SQL 语句可供参考：

```sql
UPDATE am_menu
SET
  path = CONCAT('/development-tools', path),
  redirect = REPLACE(redirect, '/technical-document', '/development-tools/technical-document'),
  component = REPLACE(component, './TechnicalDocument/', './DevelopmentTools/TechnicalDocument/')
WHERE path LIKE '/technical-document%';

SELECT *
FROM am_menu
WHERE path LIKE '/development-tools/technical-document%' LIMIT 100

SELECT *
FROM am_menu
WHERE path LIKE '/technical-document%' LIMIT 100
```
