import { configureStore } from "@reduxjs/toolkit";
import feedReducer from './features/feedSlice';
import playlistsSlice from "./features/playlistsSlice";

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    playlists: playlistsSlice
  }
})