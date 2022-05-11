const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const momentHandler = require("handlebars.moment");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");

const db = require("./config/connection");

// app setup

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

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

// handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// this serves up the "public" folder as the front end
app.use(express.static(path.join(__dirname, "public")));

// router
app.use(routes);

// start up our app
db.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT}`);
  });
});
