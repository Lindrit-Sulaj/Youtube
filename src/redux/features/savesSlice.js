import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('savesSlice')) || [];

export const savesSlice = createSlice({
  name: 'saves',
  initialState,
  reducers: {
    saveVideo(state, { payload }) {
      state.unshift(payload);
      localStorage.setItem('savesSlice', JSON.stringify(state));
    },
    unsaveVideo(state, { payload }) {
      const newState = state.filter(elem => elem.videoId !== payload);
      localStorage.setItem('savesSlice', JSON.stringify(newState));
      return newState;
    }
  }
})

export const { saveVideo, unsaveVideo } = savesSlice.actions;
export default savesSlice.reducer