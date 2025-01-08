/*
 * @Description: 全局配置
 */
import { registerAs } from '@nestjs/config';

// 默认会合并 根目录下的.env文件 process.env 不会覆盖
export default registerAs('elasticsearch', () => ({
  elasticsearchNode: process.env.ELASTICSEARCH_NODE,
  elasticsearchUsername: process.env.ELASTICSEARCH_USERNAME,
  elasticsearchPassword: process.env.ELASTICSEARCH_PASSWORD,
}));
