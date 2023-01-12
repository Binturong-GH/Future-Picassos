import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// @desc: get logged in user information
export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const token = localStorage.getItem('jwt');
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get('/auth/me', config);
    return res.data;
  } catch (error) {
    const errMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    throw new Error(errMsg);
  }
});

// @desc: user sign up
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ name, email, password, passwordConfirm }) => {
    try {
      const body = {
        name,
        email,
        password,
        passwordConfirm,
      };
      const res = await axios.post('/auth/signup', body);
      return res.data;
    } catch (error) {
      const errMsg = error.response.data;
      throw new Error(errMsg);
    }
  }
);

// @desc: user login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    try {
      const body = {
        email,
        password,
      };
      const res = await axios.post('/auth/login', body);
      return res.data;
    } catch (error) {
      const errMsg =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      throw new Error(errMsg);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    // getme
    builder.addCase(getMe.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getMe.fulfilled, (state, action) => {
      isLoading = false;
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    });

    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = action.error;
    });

    // user signup
    builder.addCase(signup.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      localStorage.setItem('jwt', JSON.stringify(action.payload.token));
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // user login
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      localStorage.setItem('jwt', JSON.stringify(action.payload.token));
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const authReducer = authSlice.reducer;
