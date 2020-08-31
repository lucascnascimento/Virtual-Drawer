import { Alert } from 'react-native';
import {
  openDatabase,
  ResultSet,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

import { Item } from '~/types/types';

/**
 * Opens the connection to the database
 */
const db: SQLiteDatabase = openDatabase(
  { name: 'database.db', location: 'default' },
  () => {
    Alert.alert('Conexão estabelecida', 'O banco de dados está pronto');
  },
  (error) => {
    Alert.alert(`Falha ao conectar ao banco!`, `Erro: ${error}`);
  },
);

/**
 * Executes an sql query on the database
 * @param sql SQL query to be executed
 * @param params SQL query parameters
 */
function executeQuery(sql: string, params = [] as any): Promise<ResultSet> {
  return new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(
        sql,
        params,
        (_, results) => {
          resolve(results);
        },
        (error) => {
          reject(error);
        },
      );
    });
  });
}

/**
 * Index all tables
 */
function indexTables(): Promise<ResultSet> {
  return executeQuery(
    `SELECT
        name
    FROM
        sqlite_master
    WHERE
        type ='table' AND
        name NOT LIKE 'android_metadata' AND
        name NOT LIKE 'sqlite_%'`,
    [],
  );
}

/**
 * Creates a new table in the database
 * @param name Table name
 */
function createTable(name: string): Promise<ResultSet> {
  return executeQuery(
    `CREATE TABLE IF NOT EXISTS ${name} (
      id integer PRIMARY KEY,
      name text NOT NULL,
      description text,
      location text,
      picture_src text,
      created_at text NOT NULL,
      updated_at text NOT NULL
  )`,
    [],
  );
}

/**
 * Drop the table if exists
 * @param name Table name
 */
function dropTable(name: string): Promise<ResultSet> {
  return executeQuery(`DROP TABLE IF EXISTS ${name}`, []);
}

/**
 * Search for an input pattern on database names
 * @param searchField Pattern to be searched
 */
function selectTable(searchField: string): Promise<ResultSet> {
  return executeQuery(
    `SELECT
      name
    FROM
      sqlite_master
    WHERE
      type ='table' AND
      name NOT LIKE 'sqlite_%' AND
      name NOT LIKE 'android_metadata' AND
      name LIKE '%${searchField}%';`,
    [],
  );
}

/**
 * Select all rows from the specified table
 * @param tableName Table in which the rows will be selected
 */
function selectAllRows(tableName: string): Promise<ResultSet> {
  return executeQuery(`SELECT * FROM ${tableName}`, []);
}

/**
 * Inserts a row in the selected table
 * @param tableName Table in which the information will be inserted
 * @param item Item to be inserted
 */
function insertRow(tableName: string, item: Item): Promise<ResultSet> {
  return executeQuery(
    `INSERT INTO ${tableName} (name, description, location, picture_src, created_at, updated_at) VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))`,
    [item.name, item.description, item.location, item.pictureSrc],
  );
}

/**
 * Updates a row in the selected table
 * @param tableName Table in which the information will be updated
 * @param item Item to be updated
 */
function updateRow(tableName: string, item: Item): Promise<ResultSet> {
  return executeQuery(
    `UPDATE ${tableName} SET name = ?, description = ?, location = ?, picture_src = ?, updated_at = datetime('now') WHERE id = ?`,
    [item.name, item.description, item.location, item.pictureSrc, item.id],
  );
}

/**
 * Delets a row in the selected table
 * @param tableName Table in which the infomation will be deleted
 * @param id Id of the item that will be deleted
 */
function deleteRow(tableName: string, id: number): Promise<ResultSet> {
  return executeQuery(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
}

/**
 * Search for an input pattern in a filtered column of a table
 * @param tableName Table in which the information will be searched
 * @param searchField Pattern to be searched
 * @param filter Filter maps to the a column in the table
 */
function searchRows(
  tableName: string,
  searchField: string,
  filter: string,
): Promise<ResultSet> {
  return executeQuery(
    `SELECT ${filter} FROM ${tableName} WHERE ${filter} LIKE %${searchField}%`,
    [],
  );
}

/**
 * Selects a row in the database
 * @param tableName Table in which information will be selected
 * @param id Id of the item that will be selected
 */
function selectRow(tableName: string, id: number): Promise<ResultSet> {
  return executeQuery(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
}

export default {
  indexTables,
  createTable,
  dropTable,
  selectTable,
  selectAllRows,
  insertRow,
  updateRow,
  deleteRow,
  searchRows,
  selectRow,
};
