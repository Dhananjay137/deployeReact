import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useReducer } from "react";

export const registerAsync = createAsyncThunk("customer/registerAsync",
  async(userData, { rejectWithValue }) => {

    try{
      const response = await fetch("https://deployespringboot.onrender.com/user/register",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      return await response.json();
    }
    catch(error){
      return rejectWithValue(error.message || "An error occurred while register");
    }
  }
)

export const loginAsync = createAsyncThunk("customer/loginAsync",
  async(loginData, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('email',loginData.EMAIL) ;
    formData.append('password', loginData.PASSWORD);
    try{
      const response = await fetch("https://deployespringboot.onrender.com/user/login",
        {
          method: "POST",
          body: formData,
        });
        const res = await response.json()
        return res;
    }
    catch(error){
      return rejectWithValue(error.message || "An error occurred while login");
    }
  }
) 

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    userDatabase: [], 
    registerState: false, 
    loginState: false, 
    userDetails: null, 
    loading: false,
    error: null,
    isChange: false,
    msg: null,
    loginData: false,
  },
  reducers: {
    register: (state, action) => {

    },
    login: (state, action) => {

    },
    buyItem: (state, action) => {
    },
    sessionDataStore: (state, action) => {
      state.userDetails = action.payload
      
    },
    setLoginStatus: (state, action) => {
      state.loginState = action.payload
      // console.log(state.loginState)
      // console.log(action.payload)
    },
    setChange: (state, action) => {
      state.isChange = action.payload
    },
    setUserEmpty: (state, action) => {
      state.userDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.registerState = false;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.registerState = true;
        state.error = null;
        state.msg = action.payload.msg
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.registerState = false;
        state.error = action.error.message;
      })
      .addCase(loginAsync.pending, (state) => {
        state.loginState = false;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state,action) => {
        state.loginState = true;
        state.error = null;
        if(action.payload.email){
          state.userDetails = action.payload;
          state.loginData = true
        }else{
          state.loginData = false
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loginState = false;
        state.error = action.error.message;
      });
  },
});
export default customerSlice;
export const customerAction = customerSlice.actions;