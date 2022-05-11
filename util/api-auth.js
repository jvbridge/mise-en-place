const { response } = require("express");

const authRedirect = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    // If the user is logged in proceed
    next();
  }
};

/**
 * Will send the 403 forbidden status if not properly logged in with a session.
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
const authDeny = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.sendStatus(403);
  } else {
    next();
  }
};

module.exports = { authRedirect, authDeny };
