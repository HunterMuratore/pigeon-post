// Create an express router instance object
const router = require('express').Router();
const User = require('../models/User');

/* / routes */

// Add one test GET route at root
router.get('/', async (req, res) => {
    // Access to the user id stored in the login route
    const user = await User.findByPk(req.session.user_id, {
        // Can either send the user with only the attributes you want, or excluding the ones you don't want
        attributes: ['id', 'email']
        // {
        //     exclude: ['password', 'createdAt', 'updatedAt']
        // }
    });

    if (user) {
        return res.render('landing', {
            // This will send the user's plain object back (meaning it will send the id email and password properties of the user back) - Need to remove the password using the attributes above
            user: user.get({ plain: true })
        });
    }

    res.render('landing');
});

// Show the register form
router.get('/register', (req, res) => {
    res.render('register', {
        // If there are any session errors from them trying to register then they will be sent through to this page for us to use
        errors: req.session.errors
    });

    // Clear the error array after you render them
    req.session.errors = [];
});

// Show the login form
router.get('/login', (req, res) => {
    res.render('login', {
        errors: req.session.errors
    });

    // Clear the error array after you render them
    req.session.errors = [];
});

// Export the router
module.exports = router;