const router = require('express').Router();
const path = require('path');
const User = require('../models/User');

// POST request route that retrieves the registration form data and creates a new user in the db
// The route will respond with a message of 'User added successfully' 
router.post('/register', (req, res) => {
    const data = req.body;

    User.create(data)
        .then(newUser => res.send({ message: 'User added successfully!', user: newUser }))
        .catch(err => console.log(err));
});

module.exports = router;
