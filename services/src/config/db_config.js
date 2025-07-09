const mongoose = require('mongoose');
const { MONGOURI } = require('./env_config');

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(MONGOURI);
    console.log('Database connected on 27017.');
    return connect;
  } catch (err) {
    console.log(`Database failed to connect ${err.message}`);
    process.exit(1);
  } finally {
    console.log('Successfully connected MongoDB.');
  }
};

module.exports = {
  dbConnect,
};
