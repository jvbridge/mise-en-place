const path = require("path");
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// TODO: routes

const db = require("./config/connection");

// app setup

const app = express();

const PORT = process.env.PORT || 3001;

// Session configuration object
const sess = {
  secret: "super secret string yo", // TODO: put in .env?

  cookie: {}, // TODO: talk to folks about what sort of cookies we want

  resave: false,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: db,
  }),
};

// Middleware

app.use(session(sess));

// TODO: app engine goes here

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// this serves up the "public" folder, if we use handlebars it won't be needed
app.use(express.static(path.join(__dirname, "public")));

// TODO: finished router goes here (dont forget to require() it)
// app.use(routes);

// start up our app
db.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT}`);
  });
});
