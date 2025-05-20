const { default: status } = require("http-status");
const { CustomError } = require("../lib/utils");
const sqlQuery = require("../database/sqlQuery");
const Joi = require("joi");
const Bcrypt = require("bcryptjs");
const User = require("../database/models/user");

const addUserSchema = Joi.object({
  firstName: Joi.string().required().label("First Name"),
  middleName: Joi.string().optional().allow("").label("Middle Name"),
  lastName: Joi.string().required().label("Last Name"),
  username: Joi.string().required().label("Username"),
  password: Joi.string().min(3).required().label("Password"),
  role: Joi.string().optional().allow("").label("Role"),
});

const schoolYears = async (req, res) => {
  const query = `SELECT * FROM schoolYears`;
  const result = await sqlQuery(query);

  res.send(result);
};

const addSchoolYear = async (req, res) => {
  const { schoolYearName } = req.body;

  if (!schoolYearName) {
    throw new CustomError("schoolYearName is required.", status.BAD_REQUEST);
  }

  const query = `INSERT INTO schoolYears (schoolYearName) VALUES (?)`;
  const result = await sqlQuery(query, [schoolYearName]);

  res.send(result);
};

const addUser = async (req, res) => {
  const { value, error } = addUserSchema.validate(req.body);

  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }

  value.password = await Bcrypt.hash(value.password, 10);

  const userId = await User.add(value);

  res.send({ userId });
};

module.exports = { schoolYears, addSchoolYear, addUser };
