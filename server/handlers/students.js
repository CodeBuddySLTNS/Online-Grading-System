const Student = require("../database/models/student");

const students = async (req, res) => {
  const { departmentId, yearLevel, all } = req.query;
  const students = await Student.getAllByDepartmentAndYear(
    departmentId,
    yearLevel,
    all
  );
  res.send(students);
};

const studentsWithGrades = async (req, res) => {
  const { departmentId, yearLevel, all } = req.query;

  const students = await Student.getAllWithGrades(req.query);
  res.send(students);
};

const studentsBySubject = async (req, res) => {
  const { subjectId, departmentId, yearLevel, schoolYearId } = req.query;
  const students = await Student.getAllStudentsBySubject(req.query);
  res.send(students);
};

module.exports = { students, studentsBySubject, studentsWithGrades };
