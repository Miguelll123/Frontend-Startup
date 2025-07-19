import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';
import { message } from 'antd';

const user = JSON.parse(localStorage.getItem('user') || null);
const token = localStorage.getItem('token') || null;

const initialState = {
    user: user,
    token : token,
    isError : false,
    isSuccess : false,
    message: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      reset : (state)=> {
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled,(state, action) =>{
         state.user = action.payload.user;
         state.token = action.payload.token;
         state.isSuccess = true;
         state.message = action.payload.message;
        })
        .addCase(login.rejected,(state,action)=> {
            state.user = null;
            state.token = token;
            state.isError = true;
            state.message = action.payload;
            
        })
        .addCase(logout.fulfilled, (state,action)=> {
          state.user = null;
          state.token = "";
        })
    }
})




export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error.response.data.error[0].message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
   return await authService.logout();
  } catch(error) {
    console.error(error);
  }
});


export const {reset} = authSlice.actions;
export default authSlice.reducer;