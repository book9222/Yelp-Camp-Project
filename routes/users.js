const express = require('express');
const router = express.Router();
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');




////////////// Register //////////////////
router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req, res, next) => {
    //res.send(req.body)
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username })
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if (err) return next()
            req.flash('success', 'Welcome to Yelp camp');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
    //console.log(registerUser);
}));



///////////////// Login ///////////////////
router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
})


///////////////// Logout /////////////////
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success', "You had logged out, Good Bye!")
    res.redirect('/campgrounds');
})

module.exports = router;