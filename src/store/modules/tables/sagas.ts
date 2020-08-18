import { ResultSet } from 'react-native-sqlite-storage';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import Database from '~/database/database';
import { TablesList } from '~/types/types';
import { IndexDatabaseTablesSucess } from './actions';
import * as types from './types';

// todo: Caso não tenha nenhuma informaçao retornada do banco de dados tratar o erro
export function* IndexDatabaseTables() {
  // const db = new Database();
  // const tables: ResultSet = yield call(db.indexTables);
  // const tablesList: TablesList = { tables: [] };
  // if (tables.rows.length >= 1) {
  //   for (let i = 0; i < tables.rows.length; i++) {
  //     const row = tables.rows.item(i);
  //     tablesList.tables.push(row);
  //   }
  //   yield put(IndexDatabaseTablesSucess(tablesList));
  // }
}

export default all([
  takeLatest(types.INDEX_DATABASE_TABLES_REQUEST, IndexDatabaseTables),
]);
