import * as types from './types';
import { TablesList } from '~/types/types';

export function IndexDatabaseTablesRequest(): types.DatabaseTablesTypes {
  return {
    type: types.INDEX_DATABASE_TABLES_REQUEST,
  };
}

export function IndexDatabaseTablesSucess(
  databaseList: TablesList,
): types.DatabaseTablesTypes {
  return {
    type: types.INDEX_DATABASE_TABLES_SUCESS,
    payload: databaseList,
  };
}
