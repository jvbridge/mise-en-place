const Users = require("./users");
const Events = require("./events");
const RecurringPatterns = require("./recurring-patterns");
const Checklists = require("./checklists");
const ChecklistItems = require("./checklist-items");

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

Checklists.hasMany(ChecklistItems, {
  foreignKey: "checklist_id",
  onDelete: "CASCADE",
});

// TODO: how does onDelete work with this, we need it to cascade to it
RecurringPatterns.belongsTo(Events, {
  foreignKey: "event_id",
});

ChecklistItems.belongsTo(Checklists, {
  foreignKey: "checklist_id",
});

module.exports = {
  Users,
  Events,
  RecurringPatterns,
  Checklists,
  ChecklistItems,
};
