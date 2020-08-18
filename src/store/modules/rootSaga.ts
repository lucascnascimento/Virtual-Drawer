import { all } from 'redux-saga/effects';

import tables from './tables/sagas';

export default function* rootSaga() {
  return yield all([tables]);
}
