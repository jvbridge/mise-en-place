const router = require("express").Router();

const events = require("./events");
router.use("/events", events);

const users = require("./users");
router.use("/users", users);

module.exports = router;
