const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

/**
 * The events class is used to hold any event that may happen. It designates
 * when it starts, stops, and the time period it takes place over
 */
class Events extends Model {}

Events.init(
  {
    id: {
      // primary key
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // forign key to reference the user that made it
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    // the name the user gave to the event
    title: {
      type: DataTypes.STRING, // 255 character max
      allowNull: false,
    },
    // optional description
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    start_date: {
      // TODO: Should this ever be null? Why would it be null?
      type: DataTypes.DATE,
    },
    // if it's null the event ends on the same day it started
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // can be null for all day events
    start_time: {
      type: DataTypes.TIME,
    },
    // if null the event is a reminder type event
    end_time: {
      type: DataTypes.TIME,
    },
    is_full_day: {
      type: DataTypes.BOOLEAN,
    },
    /* if this is recurring then we expect an entry on the recurring-pattern
     * table */
    is_recurring: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "events",
  }
);

module.exports = Events;
