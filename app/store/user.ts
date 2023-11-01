import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    loginUser: (state, action) => {
      state = action.payload;
    },
    updateUser: (state, action) => {
      state = action.payload;
    },
    logoutUser: (state, action) => {
      state = {};
    },
  },
});

export const { loginUser, logoutUser, updateUser } = user.actions;
export default user.reducer;
