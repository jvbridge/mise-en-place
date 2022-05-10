const sequelize = require("../config/connection");
const { Users } = require("../models");

const userdata = require("./users.json");

const MAX_EVENTS = 10;

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(userdata, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
