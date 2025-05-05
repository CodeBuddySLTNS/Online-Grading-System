const Department = require("../database/models/department");

const departments = async (req, res) => {
  const departments = await Department.getAll();
  res.send(departments);
};

module.exports = { departments };
