const router = require("express").Router();
const { Events } = require("../../models");
const { authDeny } = require("../../util/api-auth");

router.get("/", authDeny, async (req, res) => {
  try {
    const eventsData = await Events.findAll({
      where: { user_id: req.session.userId },
    });

    if (!eventsData.length) {
      res
        .status(404)
        .json(`Found no events for user id: ${req.session.userId}`);
      return;
    }

    // serealize events for transit
    const events = eventsData.map((event) => event.get({ plain: true }));

    // send them
    res.json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", authDeny, async (req, res) => {
  try {
    console.log("got a post request for a new event: ", req.body);
    // create the event object
    const event = {
      user_id: req.session.userId,
      title: req.body.title,
      description: req.body.description,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      is_full_day: req.body.is_full_day,
      is_recurring: req.body.is_recurring,
    };

    console.log("Created Event object: ", event);

    // TODO: check to make sure the reponse is formated correctly

    // create the event
    const responseEventData = await Events.create({ ...event });

    // respond to confirm to user that we made it
    const responseEvent = responseEventData.get({ plain: true });

    res.status(200).json(responseEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", authDeny, async (req, res) => {
  try {
    // find the event
    const eventData = await Events.findOne({
      where: { id: req.params.id },
    });

    // check if we found an event
    if (!eventData) {
      res.status(404).json(`could not find an event with id: ${req.params.id}`);
      return;
    }

    // check if the event belongs to the user
    if (eventData.user_id !== req.session.userId) {
      res.status(403).json("user does not own that event");
      return;
    }

    // send it!
    const event = eventData.get({ plain: true });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", authDeny, async (req, res) => {
  try {
    // find the event
    const eventData = await Events.findOne({
      where: { id: req.params.id },
    });

    // check if we found an event
    if (!eventData) {
      res.status(404).json(`could not find an event with id: ${req.params.id}`);
      return;
    }

    // check if the event belongs to the user
    if (eventData.user_id !== req.session.userId) {
      res.status(403).json("user does not own that event");
      return;
    }

    // all good, destroy the event
    await eventData.destroy();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", authDeny, async (req, res) => {
  try {
    // find the event
    const eventData = await Events.findOne({
      where: { id: req.params.id },
    });

    // check if we found an event
    if (!eventData) {
      res.status(404).json(`could not find an event with id: ${req.params.id}`);
      return;
    }

    // check if the event belongs to the user
    if (eventData.user_id !== req.session.userId) {
      res.status(403).json("user does not own that event");
      return;
    }

    // all good, update the event
    eventData;
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
