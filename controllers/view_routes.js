// Create an express router instance object
const router = require('express').Router();
const User = require('../models/User');

/* / routes */

// Add one test GET route at root
router.get('/', (req, res) => {
    // look in the folder 'views' for a file called landing.hbs and compile it
    res.render('landing', { 
        name: 'Hunter',
        fruits: ['orange', 'apple', 'pear'],
        data: [
            {
                name: 'bob',
                age: 99
            },
            {
                name: 'Hunter',
                age: 25
            }
        ]
    }); 
});

// Show the register form
router.get('/register', (req, res) => {
    res.render('register'); 
});

// Export the router
module.exports = router;