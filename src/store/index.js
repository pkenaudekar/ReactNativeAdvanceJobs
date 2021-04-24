import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from '../reducers';

// config is used to passees configuration to redux-persist
const config = {
  key: 'root',
  storage: AsyncStorage, // Whenever Redux state changes AsyncStorage is the place where to save the new state
  whitelist: ['likedJobs'], // likedJobs from reducers/index.js will only be persisted
  timeout: null, // Fixes Error: redux-persist: rehydrate for "root" called after timeout.
};

const persistedReducer = persistReducer(config, reducers);

const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };
