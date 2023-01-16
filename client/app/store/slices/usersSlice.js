import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./authSlice";

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

// @desc: Admin delete user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete(`/api/users/${id}`, config);
    return { id: id };
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
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // add case for user logout
    builder.addCase(logout, (state, action) => {
      state.users = [];
    });

    //delete user
    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      const restedUser = state.users.filter(
        (user) => user.id !== action.payload.id
      );
      state.users = restedUser;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const usersReducer = usersSlice.reducer;
