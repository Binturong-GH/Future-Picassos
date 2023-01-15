import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// @desc: Admin get all users list
export const getAllUsers = createAsyncThunk("admin/getAllUsers", async () => {
  try {
    const token = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get("/api/users", config);
    return res.data;
  } catch (error) {
    const errMsg = error.response.data;
    throw new Error(errMsg);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    users: [],
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    // get all users list
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.users = action.payload.users;
    });
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isLoading = true;
      state.error = action.error.message;
    });
  },
});

export const usersReducer = usersSlice.reducer;
