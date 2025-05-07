const Student = require("../database/models/student");

const students = async (req, res) => {
  const { departmentId, yearLevel } = req.query;
  console.log(departmentId, yearLevel);
  const students = await Student.getAllByDepartmentAndYear(
    departmentId,
    yearLevel
  );
  res.send(students);
};

module.exports = { students };
