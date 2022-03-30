import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';

export const PERSIST_KEY = 'root';

const persistConfig = {
  key: PERSIST_KEY,
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth'],
};

const sagaMiddleware = createSagaMiddleware();

const configDevStore = () => createStore(
  persistReducer(persistConfig, rootReducer),
  ((typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose)(
    applyMiddleware(sagaMiddleware),
  ),
);

const configProdStore = () => createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(sagaMiddleware),
);

export const store = process.env.NODE_ENV === 'production' ? configProdStore() : configDevStore();
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
