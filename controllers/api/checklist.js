const router = require("express").Router();
const { ChecklistItems, Checklists } = require("../../models");
const { authDeny } = require("../../util/api-auth");

// gets all the checklists
router.get("/", authDeny, async (req, res) => {
  try {
    const checklistData = await Checklists.findAll({
      where: { user_id: req.session.userId },
      include: [{ model: ChecklistItems, required: false }],
    });

    if (!checklistData.length) {
      res
        .status(404)
        .json(`Found no checklists for user id: ${req.session.userId}`);
      return;
    }
    const checklists = checklistData.map((check) => check.get({ plain: true }));
    res.json(checklists);
  } catch (err) {
    res.status(500).json(err);
  }
});

// creates a new checklist
router.post("/", authDeny, async (req, res) => {
  try {
    const checklist = {
      name: req.body.name,
      description: req.body.description,
      user_id: req.session.userId,
    };

    const responseList = await Checklists.create(checklist);
    res.status(200).json(responseList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a specific checklist
router.get("/:id", authDeny, async (req, res) => {
  try {
    const checklistData = await Checklists.findOne({
      where: { id: req.params.id },
      include: [{ model: ChecklistItems, required: false }],
    });

    if (!checklistData) {
      res.status(404).json(`Found no checklists with id: ${req.params.id}`);
      return;
    }

    if (checklistData.user_id !== req.session.userId) {
      res.status(403).json("User does not own that checklist");
      return;
    }

    const checklist = checklistData.get({ plain: true });
    res.status(200).json(checklist);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", authDeny, async (req, res) => {
  try {
    const checklistData = await Checklists.findOne({
      where: { id: req.params.id },
      include: [{ model: ChecklistItems, required: false }],
    });

    if (!checklistData) {
      res.status(404).json(`Found no checklists with id: ${req.params.id}`);
      return;
    }

    if (checklistData.user_id !== req.session.userId) {
      res.status(403).json("User does not own that checklist");
      return;
    }

    await checklistData.destroy();

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
