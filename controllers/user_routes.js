const router = require('express').Router();
const User = require('../models/User');

/* /auth routes */

// POST request route that retrieves the registration form data and creates a new user in the db
// The route will respond with a message of 'User added successfully' 
router.post('/register', async (req, res) => {
    const data = req.body;

    try {
        const user = await User.create(data);
    
        // Authenticate user
        req.session.user_id = user.id;

        // Already have a route that renders landing so just redirect to it here
        res.redirect('/');
        
    } catch (err) { 
        // Get the sequelize error object array and loop over it to turn each error object into a string
        // Results in an array of just the error messages
        req.session.errors = err.errors.map(errObj => errObj.message);
        res.redirect('/register');
    };
});

router.post('/login', async (req, res) => {
    const data = req.body;

    // Find the user by the email they sent through the form
    const user = await User.findOne({
        where: {
            email: data.email
        }
    });

    // User not found with the email address provided
    if (!user) {
        req.session.errors = ['No user found with that email address.'];
        return res.redirect('/login');
    }

    const pass_is_valid = await user.validatePass(data.password);
    
    // Check if password is valid
    if (!pass_is_valid) {
        req.session.errors = ['Password is incorrect.'];
        return res.redirect('/login');
    }

    // Log in the user - Take the id of the user and set it to the session id
    req.session.user_id = user.id;

    res.redirect('/');
})

// Log the user out of their session and redirect back to home page
router.get('/logout', (req, res) => {
    req.session.destroy();

    res.redirect('/');
});

module.exports = router;
