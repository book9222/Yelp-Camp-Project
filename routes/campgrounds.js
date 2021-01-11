const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const campgrounds = require('../controllers/campgrounds')
const multer = require('multer');

const { storage } = require('../cloudinary');
const upload = multer({ storage });

const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');


// router.route('/')
//     .get(catchAsync(campgrounds.index))
//     .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))

////////////// Index /////////////
router.get('/', catchAsync(campgrounds.index));


////////////// New /////////////////
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
// router.post('/', upload.array('image'), (req, res) => {
//     console.log(req.body, req.files);
//     res.send('It worked')
// })

////////////// Show ////////////////
router.get('/:id', catchAsync(campgrounds.showCampground));


//////////// Edit //////////////////
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground));


/////////// Delete //////////////////
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;