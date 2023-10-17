// Create an express router instance object
const router = require('express').Router();
const User = require('../models/User');

/* / routes */

// Add one test GET route at root
router.get('/', async (req, res) => {
    // Access to the user id stored in the login route
    const user = await User.findByPk(req.session.user_id);

    if (user) {
        res.render('landing', {
            user: {
                id: user.id,
                email: user.email
            }
        });
    } else {
        res.render('landing');
    }
});

// Show the register form
router.get('/register', (req, res) => {
    res.render('register'); 
});

// Show the login form
router.get('/login', (req, res) => {
    res.render('login'); 
});

// Export the router
module.exports = router;