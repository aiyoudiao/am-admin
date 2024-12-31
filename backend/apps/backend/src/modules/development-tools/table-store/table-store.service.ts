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
          primaryKey,
          attributeColumns,
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
          primaryKey,
          updateOfAttributeColumns: [{ PUT: attributeColumns }],
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
          primaryKey,
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

    return new Promise((resolve, reject) => {
      this.client.describeTable({ tableName }, (err, data) => {
        const list = data.tableMeta.primaryKey.map((item) => item.name);
        if (err) {
          reject(err);
        } else {
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
            offset: offset,
          };
          if (columnToQuery && queryValue) {
            params.columnFilter = new TableStore.SingleColumnCondition(
              columnToQuery,
              queryValue,
              TableStore.ComparatorType.EQUAL,
              true,
            );
          }

          this.client.getRange(params, (err, data) => {
            if (err) {
              reject(err);
            } else {
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

              resolve(
                responseMessage({
                  rows,
                }) as any,
              );
            }
          });
        }
      });
    });
  }
}
