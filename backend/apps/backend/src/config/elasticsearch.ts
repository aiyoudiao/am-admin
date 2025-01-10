/*
 * @Description: 全局配置
 */
import { registerAs } from '@nestjs/config';
import path from 'path';
import fs from 'fs';

// 默认会合并 根目录下的.env文件 process.env 不会覆盖
export default registerAs('elasticsearch', () => ({
  elasticsearchNode: process.env.ELASTICSEARCH_NODE,
  elasticsearchUsername: process.env.ELASTICSEARCH_USERNAME,
  elasticsearchPassword: process.env.ELASTICSEARCH_PASSWORD,
  elasticsearchTls: {
    ca: fs.readFileSync(
      path.join(__dirname, '../..', 'certs/elasticsearch-cert.pem'),
    ), // 证书路径
    rejectUnauthorized: false, // 是否忽略签名证书验证
  },
}));
