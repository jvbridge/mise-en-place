const { Model, Datatypes } = require("sequelize");
const sequelize = require("../config/connection");

class Events extends Model {}

Events.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Datatypes.STRING, // 255 character max
    allowNull: false,
  },
  description: {
    type: Datatypes.TEXT,
    allowNull: true,
  },
  start_date: {
    type: Datatypes.DATE,
  },
  end_date: {
    type: Datatypes.DATE,
  },
  start_time: {
    type: Datatypes.TIME,
  },
  end_time: {
    type: Datatypes.TIME,
  },
  is_full_day: {
    type: Datatypes.BOOLEAN,
  },
  is_recurring: {
    type: Datatypes.BOOLEAN,
  },
});

module.exports = Events;
