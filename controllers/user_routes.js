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

router.post('/login', async (req, res) => {
    const data = req.body;

    try {
        // Find the user by the email they sent through the form
        const user = await User.findOne({
            where: {
                email: data.email
            }
        });

        // Take the id of the user and set it to the session id
        req.session.user_id = user.id;
    
        res.redirect('/');
        
    } catch (err) { 
        console.log(err.errors);
        res.redirect('/login');
    };
});

module.exports = router;
