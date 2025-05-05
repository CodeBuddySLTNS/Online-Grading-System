const User = require("../database/models/user");

const users = async (req, res) => {
  const users = await User.getAll();
  res.send(users);
};

const userInfo = async (req, res) => {
  const userId = res.locals.userId;
  console.log(userId);
  const users = await User.getUserById(userId);
  res.send(users);
};

module.exports = { users, userInfo };
