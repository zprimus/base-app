import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
    darkMode: false,
}

export const clientSlice = createSlice({
    name: "client",
    initialState: {
        value: initialStateValue
    },
    reducers: {
        changeDarkMode: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const { changeDarkMode } = clientSlice.actions;

export default clientSlice.reducer;