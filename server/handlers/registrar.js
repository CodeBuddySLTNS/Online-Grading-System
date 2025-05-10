const { default: status } = require("http-status");
const Student = require("../database/models/student");
const { CustomError } = require("../lib/utils");
const sqlQuery = require("../database/sqlQuery");

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

module.exports = { schoolYears, addSchoolYear };
