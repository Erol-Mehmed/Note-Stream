const User = require('../models/User');

const createUser = async (email, name, password) => {
  try {
    return await User.create({email, name, password});
  } catch(error) {
    console.error(error);
    throw error;
  }
};

const getUser = async (email, password) => {
  try {
    return await User.findOne({ where: { email, password } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createUser,
  getUser
};
