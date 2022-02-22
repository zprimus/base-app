import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
    name: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: { initialStateValue }
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        edit: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = { initialStateValue }
        },
    }
});

export const { login, edit, logout } = userSlice.actions;

export default userSlice.reducer;