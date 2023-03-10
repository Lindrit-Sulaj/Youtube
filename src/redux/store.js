import { configureStore } from "@reduxjs/toolkit";

import savesReducer from './features/savesSlice';
import subsReducer from './features/subsSlice';
import historyReducer from './features/historySlice';
import { youtubeApi } from "./services/youtubeApi";

export const store = configureStore({
  reducer: {
    saves: savesReducer,
    subs: subsReducer,
    history: historyReducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(youtubeApi.middleware)
})