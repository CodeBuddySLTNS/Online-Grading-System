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

const departmentSubjects = async (req, res) => {
  const { teacherId, departmentId, yearLevel } = req.query;

  const teacher = await Teacher.getDepartmentSubjects(
    teacherId,
    departmentId,
    yearLevel
  );
  res.send(teacher);
};

const addTeacherDepartment = async (req, res) => {
  const { teacherId, departmentId, yearLevel, subjectId } = req.body;

  await Teacher.addTeacherDepartment(teacherId, departmentId, yearLevel);
  await Teacher.addTeacherDepartmentSubject(
    teacherId,
    departmentId,
    yearLevel,
    subjectId
  );
  res.send({ message: "Success!" });
};

module.exports = {
  teachers,
  teachersById,
  departmentSubjects,
  addTeacherDepartment,
};
