import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://event-management-backend-2-rdl9.onrender.com" || "http://localhost:5000"; 

// Signup API call
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/signup`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// Signin API call
export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/login`, credentials);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);


// Get User API call (Dynamically Fetch Token)
export const getUser = createAsyncThunk("auth/getUser", async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.token;
    const response = await axios.get(`${BASE_URL}/api/user/userdetails`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.data) {
      throw new Error("No data received");
    }

    console.log("User Data:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return rejectWithValue(error.response?.data || "Failed to fetch user");
  }
});


// Update User API call (Dynamically Fetch Token)
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (updatedData, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.put(`${BASE_URL}/api/user/update`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);






const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: (() => {
      try {
        return JSON.parse(localStorage.getItem("user")) || null;
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        return null;
      }
    })(),
    token: localStorage.getItem("token") || null, 
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;

      // Clear storage on logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
