import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {API_KEY, BASE_URL} from "../../Constant/Api_key"
import axios from "axios";


export const fetchCastFromMovie = createAsyncThunk(
    'castDetails/fetchCastFromMovie',
    async(movieId) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
            );
            return response.data;
        } catch (error) {
            throw new Error("Filed to fetch movie details");
        }
    }
);


const movieCastSlice = createSlice({
    name : "castDetails",
    initialState : {
        selectedCast : null,
        loading : false,
        error : false,
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
          .addCase(fetchCastFromMovie.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchCastFromMovie.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedCast = action.payload;
          })
          .addCase(fetchCastFromMovie.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          
    }
});

export default movieCastSlice.reducer;