const router = require("express").Router();
const { Events, Checklists, Users } = require('../models');

//Route to calendar and to render calendar
router.get('/calendar', async (req, res) => {
    try {
        const eventData = await Events.findAll ({
            include :[
                {
                    model: Users,
                    attributes: ['name'],
                }
            ]
        });
        const events = eventData.map((event) => event.get({ plain: true }));

        res.render('calendar', {
            events,
            logged_in: req.session
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Route to get and render a single event by ID
router.get('event/:id', async (req, res) => {
    try {
        const eventData = await Events.findAll ({
            include :[
                {
                    model: Users,
                    attributes: ['name'],
                }
            ]
        });
        const event = eventData.map((event) => event.get({ plain: true }));
// Render and reference handlebar that create a single event
        res.render('event', {
            event,
            logged_in: req.session
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Route to upcoming events(still need to add helper that will determine upcoming events)
router.get('/upcoming', async (req, res) => {
    try {
        const eventData = await Events.findAll ({
            include :[
                {
                    model: Users,
                    attributes: ['name'],
                }
            ]
        });
        const events = eventData.map((event) => event.get({ plain: true }));

        res.render('upcoming', {
            events,
            logged_in: req.session
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to repeated events page (need to add helper that will determine if a route is repeating or where condition)
router.get('repeated', async (req, res) => {
    try {
        const eventData = await Events.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['name'],
                }
            ]
        });
        const repeatedEvents = eventData.map((event) => event.get({ plain: true }));

        res.render('repeated', {
            repeatedEvents,
            logged_in: req.session
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to login
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res,redirect('/')
    }

    res.render('login');
});

module.exports = router;
