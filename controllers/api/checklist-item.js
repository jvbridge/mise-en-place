const router = require("express").Router();
const { ChecklistItems, Checklists } = require("../../models");
const { authDeny } = require("../../util/api-auth");

router.post("/:id", authDeny, async (req, res) => {
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

router.delete("/:id", authDeny, async (req, res) => {
  try {
    const checklistItem = await ChecklistItems.findOne({
      where: { id: req.params.id },
    });

    const parent = await Checklists.findOne({
      where: { id: checklistItem.checklist_id },
    });

    if (!checklistItem) {
      res.status(404).json(`Found no found no items with id: ${req.params.id}`);
      return;
    }

    if (parent.user_id !== req.session.userId) {
      res.status(403).json("User does not own that checklist item");
      return;
    }

    await checklistItem.destroy();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
