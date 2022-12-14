import { configureStore } from "@reduxjs/toolkit";
import strategiesReducer from './strategiesStore'
import tradesReducer from './tradesStore'
import propertiesReducer from './propertiesStore'
import synthAssetReducer from './synthAssetStore'

export const store = configureStore(
    {
        reducer: {
            strategies: strategiesReducer,
            trades: tradesReducer,
            properties: propertiesReducer,
            synthAssets: synthAssetReducer
        }
    }
)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch