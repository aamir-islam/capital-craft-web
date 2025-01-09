import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SidebarState {
  status: boolean;
}

const initialState: SidebarState = {
  status: false,
};

export const sidebarStateSlice = createSlice({
  name: "sidebarState",
  initialState,
  reducers: {
    toggleSidebarStatue: (state, action : PayloadAction<boolean>)=>{
        state.status = action.payload
    },
  },
});

export const { toggleSidebarStatue } = sidebarStateSlice.actions;
export default sidebarStateSlice.reducer;
