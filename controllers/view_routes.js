// Create an express router instance object
const router = require('express').Router();

// Add one test GET route at root
router.get('/', (req, res) => {
    res.send({message: 'Hello!'});
});

// Export the router
module.exports = router;