import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ElasticsearchCrudService } from './elasticsearch.service';

@Controller('elasticsearch')
export class ElasticsearchCrudController {
  constructor(
    private readonly elasticsearchService: ElasticsearchCrudService,
  ) {}

  @Post('elastic/:index')
  async create(@Param('index') index: string, @Body() document: any) {
    return this.elasticsearchService.create(index, document);
  }

  @Get('elastic/:index')
  async findAll(@Param('index') index: string) {
    return this.elasticsearchService.findAll(index);
  }

  @Put('elastic/:index/:id')
  async update(
    @Param('index') index: string,
    @Param('id') id: string,
    @Body() document: any,
  ) {
    return this.elasticsearchService.update(index, id, document);
  }

  @Delete('elastic/:index/:id')
  async remove(@Param('index') index: string, @Param('id') id: string) {
    return this.elasticsearchService.remove(index, id);
  }

  @Post('elastic/search/:index')
  async search(@Param('index') index: string, @Body() query: any) {
    return this.elasticsearchService.search(index, query);
  }
}
