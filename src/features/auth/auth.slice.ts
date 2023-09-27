import axios from 'axios';
import Cookies from 'universal-cookie';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from './user.types';

const cookies = new Cookies();
const token = cookies.get('userToken') ? cookies.get('userToken') : null;

export interface AuthState {
  token: string | null;
  profile: User | null;
  isLoading: boolean;
  error: string | undefined | null;
}

const initialState: AuthState = {
  token,
  profile: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'login',
  async (credentials: { email: string; password: string }) => {
    const response = await axios.post(
      'https://api.escuelajs.co/api/v1/auth/login',
      credentials,
    );
    const access_token = response.data.access_token;

    cookies.set('userToken', access_token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 20,
      secure: true,
      sameSite: 'strict',
    });
    return access_token;
  },
);

export const getProfile = createAsyncThunk(
  'getProfile',
  async (token: string) => {
    const response = await axios.get(
      'https://api.escuelajs.co/api/v1/auth/profile',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
