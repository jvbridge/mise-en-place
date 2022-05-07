const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

/**
 * Users is the table used to store every individual user data info
 */
class Users extends Model {
  /**
   * Checks to see if a password given matches a user's password
   * @param {string} password
   * @returns {boolean} whether or not the password is valid
   */
  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // username: { TODO: do we really need a user name? Email seems sufficient
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6], // minimum password length is 6
      }, // TODO: more filters for passwords
    },
  },
  {
    // When we create a new user we hash and salt their password
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "users",
  }
);

module.exports = Users;
