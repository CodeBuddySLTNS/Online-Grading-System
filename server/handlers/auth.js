const { default: status } = require("http-status");
const { CustomError, generateToken } = require("../lib/utils");
const Joi = require("joi");
const Bcrypt = require("bcryptjs");
const User = require("../database/models/user");

const signupSchema = Joi.object({
  firstName: Joi.string().required().label("First Name"),
  middleName: Joi.string().optional().allow("").label("Middle Name"),
  lastName: Joi.string().required().label("Last Name"),
  department: Joi.string().required().label("Department"),
  year: Joi.number().min(1).max(4).required().label("Year"),
  username: Joi.string().required().label("Username"),
  password: Joi.string().min(3).required().label("Password"),
  role: Joi.string().optional().allow("").label("Role"),
});

const loginSchema = Joi.object({
  username: Joi.string().required().label("Username"),
  password: Joi.string().required().label("Password"),
});

const login = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);

  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }

  const { username, password } = value;
  const user = await User.getUserByUsername(username);

  if (!user) {
    return res.status(status.UNAUTHORIZED).json({
      message: "Invalid username or password.",
    });
  }

  const isPasswordValid = await Bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(status.UNAUTHORIZED).json({
      message: "Invalid username or password.",
    });
  }

  const token = generateToken({ userId: user.userId });

  res.json({
    message: "Login successful.",
    user: {
      userId: user.userId,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      departmentName: user.departmentName,
      departmentShortName: user.shortName,
      yearLevel: user.yearLevel,
      role: user.role,
    },
    token,
  });
};

const signup = async (req, res) => {
  const { error, value } = signupSchema.validate(req.body);

  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }

  value.password = await Bcrypt.hash(value.password, 10);

  const userId = await User.add(value);
  const user = await User.getUserById(userId);
  const token = generateToken({ userId });

  delete user.password;

  res.json({ user, token });
};

module.exports = { login, signup };
