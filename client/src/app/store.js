// dependencies
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducers
import userReducer from '../reducers/user.js';

const persistConfig = {
    key: 'main-root',
    storage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)

const store = configureStore({
    reducer: {
        user: persistedUserReducer,
    },
});

let Persistor = persistStore(store)

export { Persistor }

export default store;