const User = require('../models/User');
const jwt = require("jsonwebtoken");

const createUser = async (email, name, password) => {
  const emailAlreadyRegistered = await User.findOne({ where: { email } });
  
  if (emailAlreadyRegistered) {
    throw new Error('Email already registered');
  } else {
    await User.create({email, name, password});
  }
};

const getUser = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  
  if (!user) {
    throw new Error;
  } else {
    return jwt.sign({id: user.id, email, password}, process.env.JWT_SECRET, {expiresIn: '24h'});
  }
};

module.exports = {
  createUser,
  getUser
};
