import { createSlice } from "@reduxjs/toolkit";

const fetchSlice = createSlice({
  name: "fetch",
  initialState: {
    isUpdating: false
  },
  reducers: {
    setUpdating: (state, action) => {
      state.isUpdating = action.payload
    }
  }
});
export default fetchSlice;
export const fetchAction = fetchSlice.actions;