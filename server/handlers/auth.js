const { default: status } = require("http-status");
const { CustomError } = require("../lib/utils");

const login = async (req, res) => {};

const signup = async (req, res) => {
  console.log(req.body);
};

module.exports = { login, signup };
