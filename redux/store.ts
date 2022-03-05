import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import globalReducer from './slices/globalSlice';
import userReducer from './slices/userSlice';
import storyReducer from './slices/storySlice';
import postReducer from './slices/postSlice';
import messageReducer from './slices/messageSlice';
import profileReducer from './slices/profileSlice';

const reducers = combineReducers({
  user: userReducer,
  global: globalReducer,
  post: postReducer,
  message: messageReducer,
  story: storyReducer,
  profile: profileReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user'],
};

const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      /* ignore persistance actions */
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
