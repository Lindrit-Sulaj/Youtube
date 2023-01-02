import { configureStore } from "@reduxjs/toolkit";

import feedReducer from './features/feedSlice';
import savesReducer from './features/savesSlice'
import { youtubeApi } from "./services/youtubeApi";

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    saves: savesReducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(youtubeApi.middleware)
})