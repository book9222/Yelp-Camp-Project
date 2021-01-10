const User = require('../models/user');


////////////// Register //////////////////
module.exports.renderRegiterForm = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res, next) => {
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
}


///////////////// Login ///////////////////
module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}


///////////////// Logout /////////////////
module.exports.logout = (req, res) => {
    req.logOut();
    req.flash('success', "You had logged out, Good Bye!")
    res.redirect('/campgrounds');
}