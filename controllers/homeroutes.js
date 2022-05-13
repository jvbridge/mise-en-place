const router = require("express").Router();
const { Events, Checklists, Users, ChecklistItems } = require("../models");
const { authRedirect } = require("../util/api-auth");

//Route to the homepage
router.get("/", async (req, res) => {
  try {
    const eventData = await Events.findAll({
      // where: { user_id: req.session.userId }, TODO: put log in logic for this
    });

    const events = eventData.map((event) => event.get({ plain: true }));
    res.render("homepage", {
      // events,
      // logged_in: req.session,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route to calendar and to render calendar
router.get("/calendar", authRedirect, async (req, res) => {
  try {
    const eventData = await Events.findAll({
      // where: { user_id: req.session.userId }, TODO: put log in logic for this
    });

    const events = eventData.map((event) => event.get({ plain: true }));

    res.render("calendar", {
      // events,
      // logged_in: req.session,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route to get and render the dashboard showing today's events
router.get("/dashboard", authRedirect, async (req, res) => {
  try {
    const eventData = await Events.findAll({
      where: {
        //find events that are happening today
        // start_date: req.params.Date,
        // end_date: req.params.Date,
      },
    });
    const event = eventData.map((event) => event.get({ plain: true }));
    // Render and reference handlebar that creates the dashboard
    res.render("dashboard", {
      event,
      logged_in: req.session,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route to render the add event page
router.get("/addevent", authRedirect, async (req, res) => {
  try {
    const eventData = await Events.findAll({
      where: {},
    });
    const event = eventData.map((event) => event.get({ plain: true }));
    //Render the addEvent page
    res.render("addEvent", {
      event,
      logged_in: req.session,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route to upcoming events(still need to add helper that will determine upcoming events)
router.get("/upcoming", authRedirect, async (req, res) => {
  try {
    const eventData = await Events.findAll({});
    const events = eventData.map((event) => event.get({ plain: true }));

    res.render("upcoming", {
      events,
      logged_in: req.session,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to return a single upcoming event and render that handlebars (need to add handlebar file if we decide to do so)
router.get("/upcoming/:id", authRedirect, async (req, res) => {
  try {
    const upcomingEvent = await Events.findByPk({});
    const event = upcomingEventData.map((event) => event.get({ plain: true }));
    // Rendering page for a single upcoming event
    res.render("upcomingEvent", {
      event,
      logged_in: req.session,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to repeated events page (need to add helper that will determine if a route is repeating or where condition)
router.get("/repeated", authRedirect, async (req, res) => {
  try {
    const eventData = await Events.findAll({
      where: { user_id: req.session.userId },
      include: [{ model: RecurringPatterns, required: true }],
    });
    const repeatedEvents = eventData.map((event) => event.get({ plain: true }));

    res.render("repeated", {
      repeatedEvents,
      logged_in: req.session,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a single repeated event and render its page
router.get("/repeated/:id", authRedirect, async (req, res) => {
  try {
    const eventData = await Events.findByPk(req.params.id, {});
    const repeatedEvent = eventData.map((event) => event.get({ plain: true }));
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route to checklist
router.get("/checklist", authRedirect, async (req, res) => {
  try {
    const checklistData = await Checklists.findAll({
      include: [
        {
          model: ChecklistItems,
          attributes: ["description"],
        },
      ],
    });
    const checklists = checklistData.map((checklist) =>
      checklist.get({ plain: true })
    );

    const to_do = checklists.find((checklist) => checklist.name === "To Do");

    console.log("Rendering checklists with the todo: ", to_do);

    res.render("checklist", {
      to_do,
      checklists,
      logged_in: req.session,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a single checklist item
router.get("/checklistitems/:id", async (req, res) => {
  try {
    const checklistData = await ChecklistItems.findByPk(req.params.id, {
      include: [
        {
          model: ChecklistItems,
          attributes: ["description"],
        },
      ],
    });
    const checklistItems = checklistData.map((checklistItem) =>
      checklistItem.get({ plain: true })
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to login
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
  }

  res.redirect("/");
});

module.exports = router;
