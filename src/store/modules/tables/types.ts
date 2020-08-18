import { TablesList } from '~/types/types';

export const INDEX_DATABASE_TABLES_REQUEST =
  '@database/INDEX_DATABASE_TABLES_REQUEST';
export const INDEX_DATABASE_TABLES_SUCESS =
  '@database/INDEX_DATABASE_TABLES_SUCESS';

export const CREATE_DATABASE_TABLE_REQUEST =
  '@database/CREATE_DATABASE_TABLE_REQUEST';
export const CREATE_DATABASE_TABLE_SUCESS =
  '@database/CREATE_DATABASE_TABLE_SUCESS';

export const DROP_DATABASE_TABLE_REQUEST =
  '@database/DROP_DATABASE_TABLE_REQUEST';
export const DROP_DATABASE_TABLE_SUCESS =
  '@database/DROP_DATABASE_TABLE_SUCESS';

interface IndexDatabaseTablesRequest {
  type: typeof INDEX_DATABASE_TABLES_REQUEST;
}

interface IndexDatabaseTablesSucess {
  type: typeof INDEX_DATABASE_TABLES_SUCESS;
  payload: TablesList;
}

export type DatabaseTablesTypes =
  | IndexDatabaseTablesRequest
  | IndexDatabaseTablesSucess;

// export const INSERT_ROW_REQUEST = '@database/INSERT_ROW_REQUEST';
// export const INSERT_ROW_SUCESS = '@database/INSERT_ROW_SUCESS';

// export const UPDATE_ROW_REQUEST = '@database/UPDATE_ROW_REQUEST';
// export const UPDATE_ROW_SUCESS = '@database/UPDATE_ROW_SUCESS';

// export const DELETE_ROW_REQUEST = '@database/DELETE_ROW_REQUEST';
// export const DELETE_ROW_SUCESS = '@database/DELETE_ROW_SUCESS';

// export const SEARCH_ROW_REQUEST = '@database/SEARCH_ROW_REQUEST';
// export const SEARCH_ROW_SUCESS = '@database/SEARCH_ROW_SUCESS';

// export const SELECT_ROW_REQUEST = '@database/SELECT_ROW_REQUEST';
// export const SELECT_ROW_SUCESS = '@database/SELECT_ROW_SUCESS';
