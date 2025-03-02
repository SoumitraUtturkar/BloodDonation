const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({
    rating: {type: Number, required: true, min: 1, max: 5},
    review: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
   
   
})

module.exports = mongoose.model('RatingAndReview', ratingAndReviewSchema);