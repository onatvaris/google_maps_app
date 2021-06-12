import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStore, Store } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistConfig } from 'redux-persist/es/types'

import { rootReducer } from './Reducers'

const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store: Store = createStore(persistedReducer)
export const persistor = persistStore(store)