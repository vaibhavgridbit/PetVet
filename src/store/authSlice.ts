import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User, LoginCredentials, RegisterData, AuthState} from '../types';
import {STORAGE_KEYS} from '../constants';

// Mock API calls for now - replace with actual API implementation
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, {rejectWithValue}) => {
    try {
      // Mock authentication for Phase 1 MVP
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Demo credentials
      const validCredentials = [
        { email: 'demo@petvet.com', password: 'demo123' },
        { email: 'test@example.com', password: 'test123' },
        { email: 'user@petvet.com', password: 'user123' }
      ];

      const isValidLogin = validCredentials.some(
        cred => cred.email === credentials.email && cred.password === credentials.password
      );

      if (!isValidLogin) {
        throw new Error('Invalid email or password');
      }

      const mockUser = {
        id: '1',
        name: 'Demo User',
        email: credentials.email,
        phone: '+1234567890',
        profileImage: '',
      };

      const data = {
        token: 'mock_jwt_token_' + Date.now(),
        user: mockUser,
      };

      // Store token in AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER_DATA,
        JSON.stringify(data.user),
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Login failed',
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, {rejectWithValue}) => {
    try {
      // Mock registration for Phase 1 MVP
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

      // Basic validation
      if (!userData.email || !userData.password || !userData.name) {
        throw new Error('Please fill in all required fields');
      }

      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const mockUser = {
        id: 'user_' + Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        profileImage: '',
      };

      const data = {
        token: 'mock_jwt_token_' + Date.now(),
        user: mockUser,
      };

      // Store token in AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER_DATA,
        JSON.stringify(data.user),
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Registration failed',
      );
    }
  },
);

export const loadStoredAuth = createAsyncThunk('auth/loadStored', async () => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const userDataString = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);

    if (token && userDataString) {
      const user = JSON.parse(userDataString);
      return {token, user};
    }

    return null;
  } catch (error) {
    return null;
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.AUTH_TOKEN,
    STORAGE_KEYS.USER_DATA,
  ]);
});

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: state => {
      // Clear any auth errors if needed
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {...state.user, ...action.payload};
      }
    },
  },
  extraReducers: builder => {
    builder
      // Login cases
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      // Register cases
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      // Load stored auth
      .addCase(loadStoredAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
      })
      // Logout
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const {clearAuthError, updateUserProfile} = authSlice.actions;
export default authSlice.reducer;
