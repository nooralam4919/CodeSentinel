import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            // BUG FIX: was action.payload.userData which doesn't exist.
            // useAuth now dispatches the user object directly as the payload.
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }

})

export const {login, logout} = authSlice.actions
export default authSlice.reducer