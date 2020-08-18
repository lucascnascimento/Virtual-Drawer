import tablesReducer from './reducer';
import * as types from './types';

const mockSucessPayload: types.DatabaseTablesTypes = {
  type: types.INDEX_DATABASE_TABLES_SUCESS,
  payload: { tables: ['tabela1', 'tabela2'] },
};

describe('tables reducer', () => {
  it('should return the initial state', () => {
    expect(
      tablesReducer(undefined, {
        type: types.INDEX_DATABASE_TABLES_SUCESS,
        payload: { tables: [] },
      }),
    ).toEqual({
      tables: [],
    });
  });

  it('should add database tables on sucess', () => {
    expect(tablesReducer(undefined, mockSucessPayload)).toEqual({
      tables: ['tabela1', 'tabela2'],
    });
  });
});
