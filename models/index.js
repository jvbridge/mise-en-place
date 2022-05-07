const Users = require("./users");
const Events = require("./events");
const recurringPatterns = require("./recurring-patterns");

Users.hasMany(Events, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Events.belongsTo(Users, {
  foreignKey: "user_id",
});

// TODO: how does onDelete work with this, we need it to cascade to it
recurringPatterns.belongsTo(Events, {
  foreignKey: "event_id",
});

module.exports = { Users, Events, recurringPatterns };
