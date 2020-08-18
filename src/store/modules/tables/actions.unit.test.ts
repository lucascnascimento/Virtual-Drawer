import * as types from './types';
import * as actions from './actions';

describe('actions', () => {
  it('should create an action to request database tables', () => {
    const expectedAction = {
      type: types.INDEX_DATABASE_TABLES_REQUEST,
    };

    expect(actions.IndexDatabaseTablesRequest()).toEqual(expectedAction);
  });

  it('should create an action to handle the database index sucess', () => {
    const mockPayload = { tables: ['tabela1', 'tabela2'] };
    const expectedAction = {
      type: types.INDEX_DATABASE_TABLES_SUCESS,
      payload: { tables: ['tabela1', 'tabela2'] },
    };

    expect(actions.IndexDatabaseTablesSucess(mockPayload)).toEqual(
      expectedAction,
    );
  });
});
