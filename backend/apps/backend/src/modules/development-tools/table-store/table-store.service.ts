import { Injectable } from '@nestjs/common';
import TableStore from 'tablestore';

import { responseMessage } from '@/utils'; // 全局工具函数

@Injectable()
export class TableStoreService {
  private client: TableStore.Client;

  constructor() {
    this.client = new TableStore.Client({
      maxRetries: 20, //最大重试次数，默认值为20次，可以省略此参数。
    });
  }

  async listTables(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.client.listTable({}, (err, data) => {
        if (err) {
          reject(err);
          return;
        } else {
          resolve(responseMessage(data.tableNames) as any);
        }
      });
    });
  }

  async describeTable(tableName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.describeTable({ tableName }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(responseMessage(data));
        }
      });
    });
  }

  async getRow(tableName: string, primaryKey: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.getRow(
        {
          tableName,
          primaryKey,
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(responseMessage(data));
          }
        },
      );
    });
  }

  async putRow(
    tableName: string,
    primaryKey: any,
    attributeColumns: any,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.putRow(
        {
          tableName,
          condition: new TableStore.Condition(
            TableStore.RowExistenceExpectation.IGNORE,
            null,
          ),
          primaryKey: Object.keys(primaryKey).map((key) => ({
            [key]: primaryKey[key],
          })),
          attributeColumns: Object.keys(attributeColumns).map((key) => ({
            [key]: attributeColumns[key],
          })),
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }

  async updateRow(
    tableName: string,
    primaryKey: any,
    attributeColumns: any,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.updateRow(
        {
          tableName,
          condition: new TableStore.Condition(
            TableStore.RowExistenceExpectation.IGNORE,
            null,
          ),
          primaryKey: Object.keys(primaryKey).map((key) => ({
            [key]: primaryKey[key],
          })),
          updateOfAttributeColumns: [
            {
              PUT: Object.keys(attributeColumns).map((key) => ({
                [key]: attributeColumns[key],
              })),
            },
          ],
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }

  async deleteRow(tableName: string, primaryKey: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.deleteRow(
        {
          tableName,
          condition: new TableStore.Condition(
            TableStore.RowExistenceExpectation.IGNORE,
            null,
          ),
          primaryKey: Object.keys(primaryKey).map((key) => ({
            [key]: primaryKey[key],
          })),
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }

  async queryTable(
    tableName: string,
    options: {
      offset: number;
      limit: number;
      columnToQuery?: string;
      queryValue?: string;
    },
  ): Promise<{ rows: any[]; total: number }> {
    const { offset, limit, columnToQuery, queryValue } = options;

    const res = await this.client.describeTable({ tableName });

    const list = res.tableMeta.primaryKey.map((item) => item.name);
    const params: any = {
      tableName,
      direction: TableStore.Direction.FORWARD,
      maxVersions: 1,
      inclusiveStartPrimaryKey: list.map((item) => ({
        [item]: TableStore.INF_MIN,
      })),
      exclusiveEndPrimaryKey: list.map((item) => ({
        [item]: TableStore.INF_MAX,
      })),
      limit: limit,
    };
    if (columnToQuery && queryValue) {
      params.columnFilter = new TableStore.SingleColumnCondition(
        columnToQuery,
        queryValue,
        TableStore.ComparatorType.EQUAL,
        true,
      );
    }

    const data = await this.client.getRange(params);

    const rows = data.rows.map((row: any) => {
      const item: any = {};
      row.primaryKey.forEach((col: any) => {
        item[col.name] = col.value;
      });
      row.attributes.forEach((col: any) => {
        item[col.columnName] = col.columnValue;
      });
      return item;
    });

    return responseMessage({
      rows,
    }) as any;
  }
}
