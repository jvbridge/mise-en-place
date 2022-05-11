const router = require("express").Router();
const { authDeny } = require("../../util/api-auth");

router.get("/", authDeny, async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", authDeny, async (req, res) => {});

router.delete("/:id");

router.put("/:id");

module.exports = router;
