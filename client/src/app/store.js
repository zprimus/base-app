// dependencies
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers, createStore } from 'redux';

// reducers
import clientReducer from '../reducers/client.js';
import userReducer from '../reducers/user.js';

const persistConfig = {
    key: 'main-root',
    storage,
}

const combinedReducer = combineReducers({
    client: clientReducer,
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducer)

const store = createStore(persistedReducer);

let Persistor = persistStore(store)

export { Persistor }

export default store;