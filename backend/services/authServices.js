const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const createUser = async (email, name, password) => {
  const emailAlreadyRegistered = await User.findOne({ where: { email } });

  if (emailAlreadyRegistered) {
    throw new Error('Email already registered');
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({email, name, password: hashedPassword});
  }
};

const getUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  // Compare the user password with the hashed password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error;
  } else {
    return jwt.sign({id: user.id, email, password}, process.env.JWT_SECRET, {expiresIn: '24h'});
  }
};

module.exports = {
  createUser,
  getUser
};
