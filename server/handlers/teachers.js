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

module.exports = { teachers, teachersById };
