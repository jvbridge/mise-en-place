const { response } = require("express");

const authRedirect = (req, res, next) => {
  // If the user is not logged in, redirect the user to the home page
  if (!req.session.loggedIn) {
    res.redirect("/");
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
    res.status(403).json("Not logged in");
    return;
  } else {
    next();
  }
};

module.exports = { authRedirect, authDeny };
