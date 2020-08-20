import { Alert } from 'react-native';
import {
  openDatabase,
  ResultSet,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

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
function executeQuery(sql: string, params = []): Promise<ResultSet> {
  return new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(
        sql,
        params,
        (trans, results) => {
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
export default { indexTables, createTable, dropTable };
