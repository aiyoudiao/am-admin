import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchCrudService } from './elasticsearch.service';
import { ElasticsearchCrudController } from './elasticsearch.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = {
          node: configService.get('elasticsearch.elasticsearchNode'),
          auth: {
            username: configService.get('elasticsearch.elasticsearchUsername'),
            password: String(
              configService.get('elasticsearch.elasticsearchPassword'),
            ),
          },
          tls: configService.get('elasticsearch.elasticsearchTls'),
        };
        console.log('elasticsearch config:', config);
        return config;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [ElasticsearchCrudService],
  controllers: [ElasticsearchCrudController],
  exports: [ElasticsearchCrudService],
})
export class ElasticsearchCrudModule {}
