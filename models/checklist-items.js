const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ChecklistItems extends Model {}

ChecklistItems.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // forign key
    checklist_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "checklists",
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "checklist_items",
  }
);

module.exports = ChecklistItems;
