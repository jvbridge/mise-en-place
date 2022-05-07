const { Model, Datatypes } = require("sequelize");
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
    user_id: {
      // forign key to reference the user that made it
      type: Datatypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    title: {
      // the name the user gave to the event
      type: Datatypes.STRING, // 255 character max
      allowNull: false,
    },
    description: {
      // optional description
      type: Datatypes.TEXT,
      allowNull: true,
    },
    start_date: {
      // TODO: Should this ever be null? Why would it be null?
      type: Datatypes.DATE,
    },
    end_date: {
      // end date: if it's null the event ends on the same day it started
      type: Datatypes.DATE,
      allowNull: true,
    },
    start_time: {
      // start time, can be null for all day events
      type: Datatypes.TIME,
    },
    end_time: {
      // end time, if null the event is a reminder type event
      type: Datatypes.TIME,
    },
    is_full_day: {
      type: Datatypes.BOOLEAN,
    },
    is_recurring: {
      // if this is recurring then we expect an entry on the recurring-pattern
      //table
      type: Datatypes.BOOLEAN,
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
