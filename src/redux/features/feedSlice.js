import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedVideos: [],
  history: [],
  watchLater: [],
  subscriptions: []
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {}
});

export default feedSlice.reducer;