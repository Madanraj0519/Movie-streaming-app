import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {API_KEY, BASE_URL} from "../../Constant/Api_key"
import axios from "axios";

export const fetchActorDetails = createAsyncThunk(
    'actorDetails/fetchActorDetails',
    async (actorId) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/person/${actorId}?api_key=${API_KEY}`
            );
            return response.data;
        } catch (error) {
            throw new Error("Filed to fetch movie details");
        }
    }
);

export const fetchActorMovies = createAsyncThunk(
    'actorDetails/fetchActorMovies',
    async(actorName) => {
        try{
            const response = await axios.get(
                `${BASE_URL}/search/person?api_key=${API_KEY}&query=${actorName}`
            );
            return response.data;
        }catch(err){
            throw new Error("Filed to fetch actor movie details");
        }
    }
)

const actorCastSlice = createSlice({
    name : "actorDetails",
    initialState : {
        actorDetails : null,
        actorMovies : null,
        loading : false,
        error : false,
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
          .addCase(fetchActorDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchActorDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.actorDetails = action.payload;
          })
          .addCase(fetchActorMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.actorMovies = action.payload;
          })
          .addCase(fetchActorDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          
    }
});

export default actorCastSlice.reducer;