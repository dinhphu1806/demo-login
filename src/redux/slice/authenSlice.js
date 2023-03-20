import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    login: [],
    loginGoogle: []
}

const authenSlice = createSlice({
  name: 'authen',
  initialState,
  reducers: {
    addLogin: (state, action) => {
        const newItem = action.payload;
        state.login = newItem
    },
    addLoginGoogle: (state, action) => {
        const newItem = action.payload;
        state.loginGoogle = newItem
    },
  }
});

export const {
    addLogin,
    addLoginGoogle
} = authenSlice.actions

export default authenSlice.reducer