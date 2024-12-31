import { httpRequest } from '@/utils/umiRequest';
export const listTables = () => httpRequest.get('/development-tools/table-store/tables');
export const describeTable = (tableName: string) =>
  httpRequest.get(`/development-tools/table-store/tables/${tableName}`);
export const getRow = (tableName: string, primaryKey: any) =>
  httpRequest.get(`/development-tools/table-store/tables/${tableName}/row`, { data: primaryKey });
export const putRow = (tableName: string, primaryKey: any, attributeColumns: any) =>
  httpRequest.post(`/development-tools/table-store/tables/${tableName}/row`, {
    primaryKey,
    attributeColumns,
  });
export const updateRow = (tableName: string, primaryKey: any, attributeColumns: any) =>
  httpRequest.put(`/development-tools/table-store/tables/${tableName}/row`, {
    primaryKey,
    attributeColumns,
  });
export const deleteRow = (tableName: string, primaryKey: any) =>
  httpRequest.delete(`/development-tools/table-store/tables/${tableName}/row`, {
    data: primaryKey,
  });

export const queryTable = (
  tableName: string,
  params: {
    offset: number;
    limit: number;
    columnToQuery?: string;
    queryValue?: string;
  },
) => httpRequest.post(`/development-tools/table-store/tables/${tableName}/query`, params);
