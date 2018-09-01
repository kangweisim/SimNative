import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from '../reducers';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] 
}

let persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
    const store = createStore(
        persistedReducer,
        {},
        compose(
            applyMiddleware(thunk),
        )
    );
    
    let persistor = persistStore(store);   

    return { store, persistor };
};