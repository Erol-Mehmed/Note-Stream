const User = require('../models/User');
const jwt = require("jsonwebtoken");

const createUser = async (email, name, password) => await User.create({email, name, password});

const getUser = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  
  if (!user) {
    throw new Error;
  } else {
    return await jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '24h' });
  }
};

module.exports = {
  createUser,
  getUser
};
