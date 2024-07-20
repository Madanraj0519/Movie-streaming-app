import  { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore} from "redux-persist"
import userAuthReducer from "../features/Auth/userAuthSlice";
import moviesReducer from "../features/Movie/MoviesSlice";
import movieDetailReducer from "../features/Movie/movieDetail";
import movieVideoReducer from "../features/Movie/movieVideo";
import watchListReducer from "../features/WatchList/watchList";
import SearchReducer from "../features/Movie/searchMovie";
import castReducer from "../features/Movie/castSlice";
import actorReducer from "../features/Movie/actorDetails";
import storage from "redux-persist/lib/storage";



const rootReducer = combineReducers({
        authUser : userAuthReducer,
        movies: moviesReducer,
        movieDetail: movieDetailReducer,
        movieVideos: movieVideoReducer,
        watchList : watchListReducer,
        search: SearchReducer,
        castDetails : castReducer,
        actorDetails : actorReducer,

})

const persistConfig = {
    key : 'root',
    version : 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false,
    })
});


export const persistor = persistStore(store);