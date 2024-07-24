const { response } = require('express');
const favoriteModel = require('../models/favorite.model');
const userModel = require('../models/user.model');
const errorHandler = require("../utilities/errorHandler");


const fetchFavoriteMovies = async(req, res, next) => {

  try {

    const favorite = await favoriteModel.find({userId : req.params.id});

    if(!favorite) {
      return res.status(400).json({
        success: false,
        message : "Favorite movie not found",
      })
    }

    res.status(200).json({
      success : true,
      message : "successfully fetched favorite movies",
      favorite
    });

    // console.log(favorite);
    
  } catch (error) {
    
  }
}


const addFavoriteMovies = async(req, res, next) => {

  //  if(req.user.id !== req.params.id){
  //    return next(errorHandler(401, "You can add movies only on  your account!"));
  //  }

    try {
        const { movieData } = req.body;
        let userId = req.user.id;
        let movieId = movieData.id;

        const user = await userModel.findById(userId);

        // console.log(user.favorites);

        if(!user){
          return res.status(404).json({
            success: false,
            message: "User not found",
          })
        }


        const existingFavorite = user.favorites.find( movie => movie.movie.id === movieId);

        // console.log(existingFavorite);
        // console.log("user", user.favorites._id);

        if(existingFavorite){
          return res.status(400).json({
            success : false,
            message : "Movie already exists in your favorites"
          });
        }

        user.favorites.push({ movie : movieData });

        await user.save();


        // console.log(user);

        res.status(200).json({
          success : true,
          message : "Movie successfully added",
          user,
        });
      

      } catch (error) {
         next(error);
      }
}


const deleteFavoriteMovie = async (req, res, next) => {
  
  let userId = req.user.id;
  let { id } = req.params;

  console.log(id);

  try {

   const user = await userModel.findById(userId);

   if(!user){
    return res.status(404).json({ 
      success : false,
      message : "User not found",
    });
   }

   const updateFavorites = user.favorites.filter(movie => String(movie._id) !== id);

  //  console.log(updateFavorites);

   if(updateFavorites.length === user.favorites.length){
    return res.status(404).json({ success : false, message : "Movie not found"});
   }

   user.favorites = updateFavorites;

   await user.save();

   res.status(200).json({
    success : true,
    message : "Movie deleted successfully",
    user,
   });

  } catch (error) {
    next(error);
  }
};



module.exports = {
    addFavoriteMovies,
    fetchFavoriteMovies,
    deleteFavoriteMovie,
}