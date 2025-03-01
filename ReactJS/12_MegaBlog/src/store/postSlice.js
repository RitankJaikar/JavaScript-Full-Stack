import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postData: []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        managePosts: (state, action) => {
            state.postData = action.payload;
        }
    }
});

export const { managePosts } = postSlice.actions;

export default postSlice.reducer;