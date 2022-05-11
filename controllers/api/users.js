const router = require("express").Router();
const { Users } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const userData = await Users.findAll({
      attributes: { exclude: ["password"] },
    });
    const users = userData.map((user) => user.get({ plain: true }));
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).json("improper format for request");
      return;
    }

    const dbUserData = await Users.create({
      email: req.body.email,
      password: req.body.password,
    });

    // automatically log in the user when they are first created.
    req.session.save(() => {
      // boolean for if we are logged in
      req.session.loggedIn = true;
      // user id to tag them
      req.session.userId = dbUserData.id;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {});

router.post("/login", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).json("improper format for request");
      return;
    }

    const userData = await Users.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(403).json(`Incorrect Email or password`);
      return;
    }

    const valid = userData.checkPassword(req.body.password);

    if (!valid) {
      res.status(403).json(`Incorrect Email or password`);
      return;
    }

    // automatically log in the user when they are first created.
    req.session.save(() => {
      // boolean for if we are logged in
      req.session.loggedIn = true;
      // user id to tag them
      req.session.userId = userData.id;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      res.status(400).json("user was not logged in");
      return;
    }

    // automatically log in the user when they are first created.
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.sendStatus(200);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
