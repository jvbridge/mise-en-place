const Users = require("./users");
const Events = require("./events");
const RecurringPatterns = require("./recurring-patterns");
const Checklists = require("./checklists");

Users.hasMany(Events, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Users.hasMany(Checklists, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Events.belongsTo(Users, {
  foreignKey: "user_id",
});

Checklists.belongsTo(Users, {
  foreignKey: "user_id",
});

// TODO: how does onDelete work with this, we need it to cascade to it
RecurringPatterns.belongsTo(Events, {
  foreignKey: "event_id",
});

module.exports = { Users, Events, RecurringPatterns };
