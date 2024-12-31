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
import { TableStoreService } from './table-store.service';

@Controller('development-tools/table-store')
export class TableStoreController {
  constructor(private readonly tableStoreService: TableStoreService) {}

  @Get('tables')
  async listTables() {
    return this.tableStoreService.listTables();
  }

  @Get('tables/:tableName')
  async describeTable(@Param('tableName') tableName: string) {
    return this.tableStoreService.describeTable(tableName);
  }

  @Get('tables/:tableName/row')
  async getRow(@Param('tableName') tableName: string, @Body() primaryKey: any) {
    return this.tableStoreService.getRow(tableName, primaryKey);
  }

  @Post('tables/:tableName/row')
  async putRow(
    @Param('tableName') tableName: string,
    @Body() body: { primaryKey: any; attributeColumns: any },
  ) {
    const { primaryKey, attributeColumns } = body;
    await this.tableStoreService.putRow(
      tableName,
      primaryKey,
      attributeColumns,
    );
    return { message: 'Row added successfully' };
  }

  @Put('tables/:tableName/row')
  async updateRow(
    @Param('tableName') tableName: string,
    @Body() body: { primaryKey: any; attributeColumns: any },
  ) {
    const { primaryKey, attributeColumns } = body;
    await this.tableStoreService.updateRow(
      tableName,
      primaryKey,
      attributeColumns,
    );
    return { message: 'Row updated successfully' };
  }

  @Delete('tables/:tableName/row')
  async deleteRow(
    @Param('tableName') tableName: string,
    @Body() primaryKey: any,
  ) {
    await this.tableStoreService.deleteRow(tableName, primaryKey);
    return { message: 'Row deleted successfully' };
  }

  @Post('tables/:tableName/query')
  async queryTable(
    @Param('tableName') tableName: string,
    @Body()
    body: {
      offset: number;
      limit: number;
      columnToQuery?: string;
      queryValue?: string;
    },
  ) {
    const { offset, limit, columnToQuery, queryValue } = body;
    console.log(
      'queryTable',
      tableName,
      offset,
      limit,
      columnToQuery,
      queryValue,
    );
    return this.tableStoreService.queryTable(tableName, {
      offset: Number(offset) || 0,
      limit: Number(limit) || 10,
      columnToQuery,
      queryValue,
    });
  }
}
