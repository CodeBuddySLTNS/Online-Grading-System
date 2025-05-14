const Student = require("../database/models/student");

const students = async (req, res) => {
  const { departmentId, yearLevel } = req.query;
  const students = await Student.getAllByDepartmentAndYear(
    departmentId,
    yearLevel
  );
  res.send(students);
};

const studentsBySubject = async (req, res) => {
  const { departmentId, yearLevel } = req.query;
  const students = await Student.getAllByDepartmentAndYear(
    departmentId,
    yearLevel
  );
  res.send(students);
};

module.exports = { students, studentsBySubject };
