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
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('elasticsearch.elasticsearchNode'),
        // auth: {
        //   username: configService.get('ELASTICSEARCH_USERNAME'),
        //   password: configService.get('ELASTICSEARCH_PASSWORD'),
        // },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ElasticsearchCrudService],
  controllers: [ElasticsearchCrudController],
  exports: [ElasticsearchCrudService],
})
export class ElasticsearchCrudModule {}
