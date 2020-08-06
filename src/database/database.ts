/* eslint-disable class-methods-use-this */
import { Alert } from 'react-native';
import {
  openDatabase,
  ResultSet,
  ResultSetRowList,
  SQLError,
  SQLiteDatabase,
  Transaction,
} from 'react-native-sqlite-storage';

import { Item } from '~/types/types';

const db: SQLiteDatabase = openDatabase(
  { name: 'database.db', location: 'default' },
  () => {
    Alert.alert('Conexão estabelecida', 'O banco de dados está pronto');
  },
  (error) => {
    Alert.alert(`Falha ao conectar ao banco!`, `Erro: ${error}`);
  },
);

class Database {
  private handleSucess(
    transaction: Transaction,
    resultSet: ResultSet,
  ): ResultSet {
    return resultSet;
  }

  private handleError(transaction: Transaction, error: SQLError): void {
    Alert.alert(`Erro: ${error.code}`, `Erro: ${error.message}`);
  }

  /**
   * Creates a new table in the database
   * @param name Table name
   */
  createTable(name: string): void {
    db.executeSql(
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
      this.handleSucess,
      this.handleError,
    );
  }

  /**
   * Drop the table if exists
   * @param name Table name
   */
  dropTable(name: string): void {
    db.executeSql(
      `DROP TABLE ${name}`,
      [],
      this.handleSucess,
      this.handleError,
    );
  }

  /**
   * Index all tables
   */
  indexTables(): void {
    db.executeSql(
      `SELECT
      name
  FROM
      sqlite_master
  WHERE
      type ='table' AND
      name NOT LIKE 'sqlite_%'`,
      [],
      this.handleSucess,
      this.handleError,
    );
  }

  /**
   * Inserts a row in the selected table
   * @param tableName Table in which the information will be inserted
   * @param item Item to be inserted
   */
  insert(tableName: string, item: Item): void {
    db.executeSql(
      `INSERT INTO ${tableName} (name, description, location, picture_src, created_at, updated_at) VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [item.name, item.description, item.location, item.pictureSrc],
      this.handleSucess,
      this.handleError,
    );
  }

  /**
   * Updates a row in the selected table
   * @param tableName Table in which the information will be updated
   * @param item Item to be updated
   */
  update(tableName: string, item: Item): void {
    db.executeSql(
      `UPDATE ${tableName} SET name = ?, description = ?, location = ?, picture_src = ?, updated_at = datetime('now') WHERE id = ?`,
      [item.name, item.description, item.location, item.pictureSrc, item.id],
      this.handleSucess,
      this.handleError,
    );
  }

  /**
   * Delets a row in the selected table
   * @param tableName Table in which the infomation will be deleted
   * @param id Id of the item that will be deleted
   */
  delete(tableName: string, id: number): void {
    db.executeSql(
      `DELETE FROM ${tableName} WHERE id = ?`,
      [id],
      this.handleSucess,
      this.handleError,
    );
  }

  /**
   * Search for an input pattern in a filtered column of a table
   * @param tableName Table in which the information will be searched
   * @param searchField Pattern to be searched
   * @param filter Filter maps to the a column in the table
   */
  async search(
    tableName: string,
    searchField: string,
    filter: string,
  ): Promise<ResultSetRowList[]> {
    const resultSet: ResultSet[] = await db.executeSql(
      `SELECT ${filter} FROM ${tableName} WHERE ${filter} LIKE %${searchField}%`,
      [],
    );

    const rows = resultSet.map((result) => result.rows);
    console.log(rows);
    return rows;
  }

  /**
   * Selects a row in the database
   * @param tableName Table in which information will be selected
   * @param id Id of the item that will be selected
   */
  async select(tableName: string, id: number): Promise<ResultSetRowList[]> {
    const resultSet: ResultSet[] = await db.executeSql(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id],
    );

    const rows = resultSet.map((result) => result.rows);
    console.log(rows);
    return rows;
  }
}

export default Database;
