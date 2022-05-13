const router = require("express").Router();
const { Users, Checklists } = require("../../models");
const { authDeny } = require("../../util/api-auth");

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

    // create the user id
    const dbUserData = await Users.create({
      email: req.body.email,
      password: req.body.password,
    });

    // create teh todo list string
    const dbUserTodoList = await Checklists.create({
      name: "To Do",
      user_id: dbUserData.id,
    });

    // automatically log in the user when they are first created.
    req.session.save(() => {
      // boolean for if we are logged in
      req.session.loggedIn = true;
      // user id to tag them
      req.session.userId = dbUserData.id;
      // todo list id to associate them
      req.session.todoId = dbUserTodoList.id;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", authDeny, async (req, res) => {
  try {
    const userData = await Users.findByPk(req.session.userId);
    await userData.destroy();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

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

    // get their todo list
    const userTodo = await Checklists.findOne({
      where: {
        user_id: userData.id,
        name: "To Do",
      },
    });

    // automatically log in the user when they are first created.
    req.session.save(() => {
      // boolean for if we are logged in
      req.session.loggedIn = true;
      // user id to tag them
      req.session.userId = userData.id;
      // To do list to pass into every handlebars
      req.session.todoId = userTodo.id;

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
