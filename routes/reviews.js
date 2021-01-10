const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews')

const { reviewSchema } = require('../schemas.js');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');



///////////// Make Review /////////////
router.post('/', isLoggedIn, validateReview, isLoggedIn, catchAsync(reviews.createReview))


/////////// Delete Review /////////////
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;