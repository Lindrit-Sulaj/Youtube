import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('historySlice')) || [];

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addVideo: (state, { payload }) => {
      let newState = state.filter(element => element.videoId !== payload.videoId);
      newState.unshift(payload);
      localStorage.setItem('historySlice', JSON.stringify(newState));

      return newState;
    },
    removeVideo: (state, { payload }) => {
      let newState = state.filter(elem => elem.videoId === payload);
      localStorage.setItem('historySlice', JSON.stringify(newState));
      return newState;
    },
    clearHistory: (state) => {
      state = [];
      localStorage.setItem('historySlice', JSON.stringify(state))
    }
  }
});

export const { addVideo, removeVideo, clearHistory } = historySlice.actions;
export default historySlice.reducer;