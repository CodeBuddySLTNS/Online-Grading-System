const Teacher = require("../database/models/teacher");

const teachers = async (req, res) => {
  const teachers = await Teacher.getAllWithDepartments();
  res.send(teachers);
};

const teachersById = async (req, res) => {
  const { id: teacherId, sy: schoolYearId } = req.query;
  const teacher = await Teacher.getTeacherById(teacherId, schoolYearId);
  res.send(teacher);
};

const departmentSubjects = async (req, res) => {
  const { teacherId, departmentId, yearLevel, schoolYearId } = req.query;

  const teacher = await Teacher.getDepartmentSubjects(
    teacherId,
    departmentId,
    yearLevel,
    schoolYearId
  );
  res.send(teacher);
};

const addTeacherDepartment = async (req, res) => {
  const { teacherId, departmentId, yearLevel, subjectId, schoolYearId } =
    req.body;

  await Teacher.addTeacherDepartment(
    teacherId,
    departmentId,
    yearLevel,
    schoolYearId
  );
  await Teacher.addTeacherDepartmentSubject(
    teacherId,
    departmentId,
    yearLevel,
    subjectId,
    schoolYearId
  );
  res.send({ message: "Success!" });
};

module.exports = {
  teachers,
  teachersById,
  departmentSubjects,
  addTeacherDepartment,
};
