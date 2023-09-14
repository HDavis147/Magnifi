const sequelize = require('../config/connection');
const { User, Song } = require('../models');

const userData = require('./userData.json');
const songData = require('./songData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Song.bulkCreate(songData, {
    individualHooks: true,
    returning: true,
  })

  process.exit(0);
};

seedDatabase();