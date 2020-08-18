/* Tenho que criar um mock da classe database, testa se o yield que chama ela
está funcionando, mockar um valor de retorno, iterar nesse valor e retornar uma
lista que será putada no final da iteração.

Se a chamada ao banco de dados não der certo ele tem que gerar um alerta
*/
import { testSaga } from 'redux-saga-test-plan';
import { openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { IndexDatabaseTables } from './sagas';
import Database from '../../../database/database';
import { IndexDatabaseTablesSucess } from './actions';

// jest.mock('../../../database/database');

// const db = Database.getInstance();

// describe('IndexDatabaseTables saga unit test', () => {
//   testSaga(IndexDatabaseTables)
//     .next()
//     .call(db.createTable)
//     .put(IndexDatabaseTablesSucess({ tables: [] }))
//     .next()
//     .isDone();
// });

// it('Should create a new database', () => {
//   jest.mock('react-native-sqlite-storage');
//   let value = false;
//   const dbzinho: SQLiteDatabase = openDatabase({ name: 'database.db' });
//   if (dbzinho) value = true;
//   expect(value).toBeTruthy();
// });
