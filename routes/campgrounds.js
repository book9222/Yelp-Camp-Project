const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const campgrounds = require('../controllers/campgrounds')

const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');


// router.route('/')
//     .get(catchAsync(campgrounds.index))
//     .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))

////////////// Index /////////////
router.get('/', catchAsync(campgrounds.index));


////////////// New /////////////////
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))


////////////// Show ////////////////
router.get('/:id', catchAsync(campgrounds.showCampground));


//////////// Edit //////////////////
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));


/////////// Delete //////////////////
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;