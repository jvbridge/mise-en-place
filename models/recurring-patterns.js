const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

/**
 * recurringPatterns allow us to store the pattern for an event the re-occurs.
 */
class recurringPatterns extends Model {}

recurringPatterns.init(
  {
    // primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // forign key
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "events",
        key: "id",
      },
    },
    // unix time separation count
    separation_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    days_of_week: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      validate: {
        // since this is an array we must use a custom validator
        customValidator(value) {
          if (value.length > 7)
            throw new Error("days_of_week has more than 7 days");
          // check if the array is only unique properties
          if (value.length !== new Set(value))
            throw new Error("got repeating values in days_of_week");

          // check each entry for correct properties
          value.forEach((day, index) => {
            if (day > 7) {
              throw new Error(`Day at index ${index} is too large to be a day`);
            }
            if (day < 1) {
              throw new Error(`Day at index ${index} is too small to be a day`);
            }
          });
        },
      },
    },
    // TODO: how would we implement last day of the month? (in cases like rent)
    days_of_month: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      validate: {
        customValidator(value) {
          if (value.length > 31)
            throw new Error("days_of_month has more than 31 days");
          // check if the array is only unique properties
          if (value.length !== new Set(value))
            throw new Error("got repeating values in days_of_week");

          // validate each entry
          value.forEach((day, index) => {
            if (day > 31) {
              throw new Error(`Day at index ${index} is too large to be a day`);
            }
            if (day < 1) {
              throw new Error(`Day at index ${index} is too small to be a day`);
            }
          });
        },
      },
    },
    months_of_year: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      validate: {
        customValidator(value) {
          if (value.length > 12)
            throw new Error("months_of_year has more than 12 months");
          // check if the array is only unique properties
          if (value.length !== new Set(value))
            throw new Error("got repeating values in months_of_year");

          // validate each entry
          value.forEach((month, index) => {
            if (month > 12) {
              throw new Error(
                `Month at index ${index} is too large to be a month`
              );
            }
            if (month < 1) {
              throw new Error(
                `Month at index ${index} is too small to be a month`
              );
            }
          });
        },
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "recurring_patterns",
  }
);

module.exports = recurringPatterns;
