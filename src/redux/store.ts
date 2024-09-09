import {configureStore} from '@reduxjs/toolkit';
import navigationReducer from './navigationSlice';
import {leadsApi} from './leadsAPI';


export const store = configureStore({
    reducer: {
        navigation: navigationReducer,
        [leadsApi.reducerPath]: leadsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(leadsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
