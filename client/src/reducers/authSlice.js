import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  userData: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isAuth: false,
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.error.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    console.log(error.response);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.response.data.error.message ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// Forget Password
export const forgetPass = createAsyncThunk(
  "auth/forget-password",
  async (user, thunkAPI) => {
    try {
      return await authService.frogetPassword(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.error.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Reset Password
export const resetPass = createAsyncThunk(
  "auth/reset-password",
  async (user, thunkAPI) => {
    try {
      return await authService.resetPassword(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.error.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Load User
export const loadUsr = createAsyncThunk(
  "auth/load-user",
  async (user, thunkAPI) => {
    try {
      return await authService.loadUser(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.error.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
        state.userData = null;
        state.isSuccess = false;
        state.isAuth = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload;
        state.isAuth = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userData = null;
        state.isAuth = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
        state.userData = null;
        state.isSuccess = false;
        state.isAuth = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload.data;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userData = null;
        state.isAuth = false;
      })
      .addCase(forgetPass.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
        state.userData = null;
        state.isSuccess = false;
        state.isAuth = false;
      })
      .addCase(forgetPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload.data;
        state.message = "";
        state.isAuth = false;
      })
      .addCase(forgetPass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userData = null;
        state.isAuth = false;
      })
      .addCase(resetPass.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
        state.userData = null;
        state.isSuccess = false;
        state.isAuth = false;
      })
      .addCase(resetPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload.data;
        state.message = action.payload.message;
        state.isAuth = false;
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userData = null;
        state.isAuth = false;
      })
      .addCase(loadUsr.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
        state.userData = null;
        state.isSuccess = false;
        state.isAuth = false;
      })
      .addCase(loadUsr.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload.data;
        state.message = action.payload.message;
        state.isAuth = true;
      })
      .addCase(loadUsr.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userData = null;
        state.isAuth = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userData = null;
        state.isAuth = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
