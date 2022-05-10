const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {});

module.exports = router;
