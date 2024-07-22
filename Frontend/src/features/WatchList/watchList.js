import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Constant/Backend/axiosInstance";
import toast from "react-hot-toast";


export const fetchWatchListMovies = createAsyncThunk(
    'watchList/fetchWatchListMovies',
    async() => {
        try {
           const response = await axiosInstance.get('/api/movie/getFavorite');
           return response.data
        } catch (error) {
            return error.message;
        }
    }
)

export const fetchFavoriteMovies = createAsyncThunk(
    'watchList/fetchFavoriteMovies',
     async(data) => {
        try {
            const response = await axiosInstance.post('/api/movie/addFavorite', {
              movieData : data
            });
            
            if(response.data.success === false){
              toast.error(response.data.message);
            }
            
          } catch (error) {
            toast.error(error.message);
          }
    }
);

const watchListSlice = createSlice({
    name: "watchList",
    initialState:{
        watchListMovies:null,
        loading : false,
        error : null
    },
    reducers:{},
    extraReducers:(builder) => {
    builder
    .addCase(fetchWatchListMovies.pending, (state) =>{
        state.loading = true;
        state.error= null;
    })
    .addCase(fetchWatchListMovies.fulfilled, (state, action) =>{
        state.loading = false;
        state.watchListMovies = action.payload;
    })
    .addCase(fetchWatchListMovies.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.error.message;
    })
   },
});

export default watchListSlice.reducer;