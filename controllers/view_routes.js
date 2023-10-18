// Create an express router instance object
const router = require('express').Router();
const User = require('../models/User');

/* / routes */

// Custom Middleware function to check if the user is already logged in
function isLoggedIn(req, res, next) {
    if (req.session.user_id) {
        return res.redirect('/');
    }

    // If no user exists then move to the next callback function
    next();
}

// Check that the user is authenticated or send them to the login page
function isAuthenticated(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }

    next();
}

async function authenticate(req, res, next) {
    const user_id = req.session.user_id;
    
    if (user_id) {
        // Access to the user id stored in the login route
        const user = await User.findByPk(user_id, {
            // Can either send the user with only the attributes you want, or excluding the ones you don't want
            attributes: ['id', 'email']
            // {
            //     exclude: ['password', 'createdAt', 'updatedAt']
            // }
        });

        // This will send the user's plain object back (meaning it will send the id email and passwordproperties of the user back) - Need to remove the password using the attributes above
        req.user = user.get({ plain: true });
    }

    next();
}

// Add one test GET route at root
router.get('/', authenticate, async (req, res) => {
    res.render('landing', { user: req.user });
});

// Show the register form if the user is not logged in
router.get('/register', isLoggedIn, authenticate, (req, res) => {
    res.render('register', {
        // If there are any session errors from them trying to register then they will be sent through to this page for us to use
        errors: req.session.errors,
        user: req.user
    });

    // Clear the error array after you render them
    req.session.errors = [];
});

// Show the login form if the user is not logged in
router.get('/login', isLoggedIn, authenticate, (req, res) => {
    res.render('login', {
        errors: req.session.errors,
        user: req.user
    });

    req.session.errors = [];
});

// Show Post a Coo page if the user is authenticated
router.get('/coo', isAuthenticated, authenticate, (req, res) => {
    res.render('coo', {
      user: req.user
    });

    req.session.errors = [];
});

// Export the router
module.exports = router;