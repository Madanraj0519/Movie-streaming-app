const express = require('express');
const movieRoute = express.Router();
const { addFavoriteMovies, fetchFavoriteMovies, deleteFavoriteMovie } = require('../controller/movie.controller');
const {verifyToken} = require("../utilities/verifyToken");


movieRoute.post('/addFavorite', verifyToken ,addFavoriteMovies);
movieRoute.get('/getFavorite/:id', fetchFavoriteMovies);
movieRoute.delete('/deleteFavorite/:id', verifyToken, deleteFavoriteMovie);


module.exports = {
    movieRoute
}


