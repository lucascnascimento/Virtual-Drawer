/* eslint-disable import/prefer-default-export */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './modules/rootreducer';
import sagas from './modules/rootSaga';

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(reducers, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(sagas);

// export { store };

export function configStore(initialStore?) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    initialStore,
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(sagas);

  return { store };
}
