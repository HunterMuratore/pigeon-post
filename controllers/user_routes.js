const router = require('express').Router();
const path = require('path');
const User = require('../models/User');

/* /auth routes */

// POST request route that retrieves the registration form data and creates a new user in the db
// The route will respond with a message of 'User added successfully' 
router.post('/register', async (req, res) => {
    const data = req.body;

    // User.create(data)
    //     .then(newUser => res.send({ message: 'User added successfully!', user: newUser }))
    //     .catch(err => console.log(err));

    try {
        await User.create(data);
    
        res.redirect('/');
        
    } catch (err) { 
        console.log(err.errors);
        res.redirect('/register');
    };
});

module.exports = router;
