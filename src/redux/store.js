import { configureStore } from "@reduxjs/toolkit";
import authenSlice from "./slice/authenSlice";

export const store = configureStore({
    reducer: {
        authen: authenSlice
    }
})