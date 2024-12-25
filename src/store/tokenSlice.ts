import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface TokenState {
    token :string
} 

const initialState : TokenState = {
    token : ""
}

export const tokenSlice = createSlice({
    name : "access_token",
    initialState,
    reducers  : {
        setToken: (state, action : PayloadAction<string>)=>{
              state.token = action.payload
        },
        removedToken : (state)=>{
            state.token = ""
        }
    }

})

export const {setToken, removedToken} = tokenSlice.actions

export default tokenSlice.reducer