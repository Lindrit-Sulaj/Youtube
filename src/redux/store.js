import { configureStore } from "@reduxjs/toolkit";

import feedReducer from './features/feedSlice';
import { youtubeApi } from "./services/youtubeApi";

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(youtubeApi.middleware)
})