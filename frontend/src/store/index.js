import {
    configureStore, 
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

const initialState = {
    movies : [],
    genresLoaded : false,
    genres : [],
};

const NetflixSlice = createSlice({
    name : "netflix",
    initialState,
    extraReducers : (builders) => {},
});

export const store = configureStore({
    reducer : {
        netflix : NetflixSlice.reducer,
    },
});