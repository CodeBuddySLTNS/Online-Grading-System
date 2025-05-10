const Student = require("../database/models/student");

const grades = async (req, res) => {
  res.send("grades");
};

module.exports = { grades };
