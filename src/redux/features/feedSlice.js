import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedVideos: [],
  history: [],
  subscriptions: []
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {}
});

export default feedSlice.reducer;