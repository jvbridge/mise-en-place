const router = require("express").Router();

const events = require("./events");
router.use("/events", events);

const users = require("./users");
router.use("/users", users);

const checklist = require("./checklist");
router.use("/checklist", checklist);

module.exports = router;
