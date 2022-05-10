const router = require("express").Router();
const { Events, Checklists, Users } = require('../models');

// Route to login
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res,redirect('/')
    }

    res.render('login');
});

module.exports = router;
