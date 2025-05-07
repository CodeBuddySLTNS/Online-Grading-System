const Teacher = require("../database/models/teacher");

const teachers = async (req, res) => {
  const teachers = await Teacher.getAllWithDepartments();
  res.send(teachers);
};

const teachersById = async (req, res) => {
  const teacherId = req.query.id;
  const teacher = await Teacher.getTeacherById(teacherId);
  res.send(teacher);
};

const addTeacherDepartment = async (req, res) => {
  const { teacherId, departmentId, yearLevel } = req.query.id;
  const result = await Teacher.addTeacherDepartment(
    teacherId,
    departmentId,
    yearLevel
  );
  res.send(result);
};

module.exports = { teachers, teachersById, addTeacherDepartment };
