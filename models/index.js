const Users = require("./users");
const Events = require("./events");

Users.hasMany(Events, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Events.belongsTo(Users, {
  foreignKey: "user_id",
});

module.exports = { Users, Events };
