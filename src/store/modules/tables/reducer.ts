/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { TablesList } from '~/types/types';
import { DatabaseTablesTypes, INDEX_DATABASE_TABLES_SUCESS } from './types';

const initialState: TablesList = {
  tables: [],
};

export default function tablesReducer(
  state = initialState,
  action: DatabaseTablesTypes,
): TablesList {
  switch (action.type) {
    case INDEX_DATABASE_TABLES_SUCESS: {
      const nextState = produce(state, (draftState) => {
        draftState.tables = draftState.tables.concat(action.payload.tables);
      });
      return nextState;
    }
    default: {
      return state;
    }
  }
}
