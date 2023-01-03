import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('subsSlice')) || [];

export const subsSlice = createSlice({
  name: 'subs',
  initialState,
  reducers: {
    subscribe(state, { payload }) {
      state.unshift(payload);
      localStorage.setItem('subsSlice', JSON.stringify(state));
    },
    unsubscribe(state, { payload }) {
      let newState = state.filter(channel => channel.channelId !== payload);
      localStorage.setItem('subsSlice', JSON.stringify(newState));
      return newState;
    }
  }
})

export const { subscribe, unsubscribe } = subsSlice.actions;
export default subsSlice.reducer;