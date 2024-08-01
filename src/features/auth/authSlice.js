import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const initialState = {
user : getUserFromLocalStorage,
isLoading:false,
isError : false,
isSuccess : false,
message: ""
}

export const login = createAsyncThunk('auth/login' , async(user,thunkAPI) =>{
    try {
        // console.log(user)
        return await authService.login(user)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
        
    }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers:(builder)=>{
    builder
    .addCase(login.pending,(state)=>{
        state.isLoading = true
    })
    .addCase(login.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
    })
    .addCase(login.rejected,(state,action)=>{
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.user = null
        state.message = action.payload.response.data.error
    })
  }
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default authSlice.reducer