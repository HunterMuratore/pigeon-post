const router = require('express').Router();
const User = require('../models/User');
const Coo = require('../models/Coo');

/* /coo routes */

// Can export this in a separate file and use where needed
function isAuthenticated(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }

    next();
}

// Can export this in a separate file and use where needed
async function authenticate(req, res, next) {
    const user_id = req.session.user_id;
    
    if (user_id) {
        const user = await User.findByPk(user_id);

        req.user = user;
    }

    next();
}

// Post a Coo
router.post('/coo', isAuthenticated, authenticate, async (req, res) => {
    try {
        const coo = await Coo.create(req.body);

        // Add the coo to the user in the session
        await req.user.addCoo(coo);

        res.redirect('/');
    } catch (err) {
        req.session.errors = err.errors.map(errObj => errObj.message);
        res.redirect('/coo');
    }
});

module.exports = router;