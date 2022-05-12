const router = require("express").Router();

const events = require("./events");
router.use("/events", events);

const users = require("./users");
router.use("/users", users);

const checklist = require("./checklist");
router.use("/checklist", checklist);

const checklistItem = require("./checklist-item");
router.use("/checklist-item", checklistItem);

module.exports = router;
