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

// delete a checklist
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

// update a checklist
router.put("/:id", authDeny, async (req, res) => {
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

    const checklist = {
      name: req.body.name,
      description: req.body.description,
    };

    checklistData.set(checklist);
    await checklistData.save();

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add an item to the checklist
router.post("/:id/item", authDeny, async (req, res) => {
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

    const item = {
      checklist_id: checklistData.id,
      description: req.body.description,
    };

    checklistItemData = await ChecklistItems.create(item);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit the checklist item
// the index is relative to the number of items in the checklist
router.put("/:id/item/:index", authDeny, async (req, res) => {
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

    const itemToMod = checklistData.checklist_items[req.params.index];

    if (!itemToMod) {
      res.status(404).json("index is out of bounds");
      return;
    }

    // get a sequelize object of the item
    const itemData = await ChecklistItems.findByPk(itemToMod.id);

    const item = {
      checklist_id: checklistData.id,
      description: req.body.description,
    };

    itemData.set(item);
    await itemData.save();

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post route to toggle the item from checked to unchecked
router.post("/:id/item/:index/toggle", authDeny, async (req, res) => {
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

    const itemToMod = checklistData.checklist_items[req.params.index];

    if (!itemToMod) {
      res.status(404).json("index is out of bounds");
      return;
    }

    // get a sequelize object of the item
    const itemData = await ChecklistItems.findByPk(itemToMod.id);

    // same everything except the completion
    const item = {
      checklist_id: checklistData.id,
      description: itemData.description,
      is_complete: !itemData.is_complete,
    };

    itemData.set(item);
    await itemData.save();

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
