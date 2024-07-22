const { strict } = require('assert');
const mongoose = require('mongoose');

const favoriteModel = mongoose.Schema({}, {strict : false});


module.exports = mongoose.model('Favorite', favoriteModel);