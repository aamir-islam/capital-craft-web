import { configureStore } from '@reduxjs/toolkit'
import tokenSlice  from './tokenSlice'
import { watchListApi } from './watchListApi'

export const store = configureStore({
  reducer: {
    access_token : tokenSlice,
    [watchListApi.reducerPath] : watchListApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(watchListApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch