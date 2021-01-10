const express = require('express');
const router = express.Router();
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const users = require('../controllers/users');
const user = require('../models/user');



////////////// Register //////////////////
router.get('/register', users.renderRegiterForm);

router.post('/register', catchAsync(users.register));



///////////////// Login ///////////////////
router.get('/login', users.renderLogin)

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)


///////////////// Logout /////////////////
router.get('/logout', users.logout)

module.exports = router;