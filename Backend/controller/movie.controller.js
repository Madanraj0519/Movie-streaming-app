const favoriteModel = require('../models/favorite.model');
const errorHandler = require("../utilities/errorHandler");


const fetchFavoriteMovies = async(req, res, next) => {

  try {

    const favorite = await favoriteModel.find({userId : req.user.id});

    if(!favorite) {
      return next(errorHandler(401, "Favorite movie not found"));
    }

    res.status(200).json({
      success : true,
      message : "sucessfully fetched favorite movies",
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
        // console.log(movieData.id);
        // console.log(userId);

        const favoriteMovie = await favoriteModel.findOne({movieId});

        if(favoriteMovie){
          return next(errorHandler(400,"This movie has already been added"));
        }

        const movie = new favoriteModel(
           {
            userId,
            movieData
           }
        );
       await movie.save();
       res.status(201).json({ 
         success : true,
         message: 'Movie saved successfully', 
         movie });
      } catch (error) {
         next(error);
      }
}


const deleteFavoriteMovie = async (req, res, next) => {
  
  // if(req.user.id !== req.params.id){
  //   return next(errorHandler(401, "You can delete movies only on your account!"));
  // }

  try {

    await favoriteModel.findByIdAndDelete(req.params.id);

    res.status(200).
    json({
        success : true,
        message : "Movie has been deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};



module.exports = {
    addFavoriteMovies,
    fetchFavoriteMovies,
    deleteFavoriteMovie
}