const router = require('express').Router();
const User = require('../models/User');

/* /auth routes */

// POST request route that retrieves the registration form data and creates a new user in the db
// The route will respond with a message of 'User added successfully' 
router.post('/register', async (req, res) => {
    const data = req.body;

    try {
        await User.create(data);
    
        // Already have a route that renders landing so just redirect to it here
        res.redirect('/');
        
    } catch (err) { 
        console.log(err.errors);
        res.redirect('/register');
    };
});

module.exports = router;
