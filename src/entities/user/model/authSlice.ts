import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '@/entities/user/api/userApi'; 

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: null, 
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.token = null;
      state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.isLoggedIn = true;
      }
    );
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;