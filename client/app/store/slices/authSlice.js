import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// @desc: get logged in user information
export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const token = JSON.parse(localStorage.getItem('jwt'));
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get('/auth/me', config);
    return res.data;
  } catch (error) {
    const errMsg = error.response.data;
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
      const errMsg = error.response.data;
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
    isLogged: false,
  },
  reducers: {
    logout(state, action) {
      state.user = null;
      state.isLogged = false;
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
    },
  },
  extraReducers(builder) {
    // getme
    builder.addCase(getMe.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogged = true;
    });

    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isLogged = false;
    });

    // user signup
    builder.addCase(signup.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isLogged = true;

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
      state.isLogged = true;
      localStorage.setItem('jwt', JSON.stringify(action.payload.token));
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
