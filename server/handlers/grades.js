const Joi = require("joi");
const XLSX = require("xlsx");
const sqlQuery = require("../database/sqlQuery");
const { CustomError } = require("../lib/utils");
const { default: status } = require("http-status");
const Grades = require("../database/models/grades");
const { getStudentSubjectById } = require("../database/models/student");

const grades = async (req, res) => {
  res.send("grades");
};

const uploadexcel = async (req, res) => {
  const schema = Joi.object({
    teacherId: Joi.number().integer().required(),
    departmentId: Joi.number().integer().required(),
    yearLevel: Joi.number().integer().min(1).max(4).required(),
    subjectId: Joi.number().integer().required(),
    schoolYearId: Joi.number().integer().required(),
    excelData: Joi.array().items(Joi.array()).required(),
    fileName: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new CustomError(errorMessage, status.BAD_REQUEST);
  }

  const filePath = "./excel-files/" + value.fileName;

  const ws = XLSX.utils.aoa_to_sheet(value.excelData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  await XLSX.writeFile(wb, filePath);

  const result = await Grades.addExcelGrade({ ...value, filePath });

  res.send({ message: "Changes saved successfully.", result });
};

const excelGrades = async (req, res) => {
  const { pending } = req.query;
  const excelGrades = await Grades.getAllExcelGrades({ pending });
  res.send(excelGrades);
};

const excelGrade = async (req, res) => {
  const { teacherId, departmentId, yearLevel, subjectId, schoolYearId, id } =
    req.query;

  let excelGrade;

  if (id) {
    excelGrade = await Grades.getExcelGradesById(id);
  } else {
    if (
      !teacherId ||
      !departmentId ||
      !yearLevel ||
      !subjectId ||
      !schoolYearId
    )
      throw new CustomError(
        "All parameters (teacherId, departmentId, yearLevel, subjectId, schoolYearId) are required.",
        status.BAD_REQUEST
      );

    excelGrade = await Grades.getExcelGradesByDepartment(req.query);
  }

  if (!excelGrade) {
    return res.send({ data: [] });
  }

  const workbook = XLSX.readFile(excelGrade.filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  delete excelGrade.filePath;
  res.send({ ...excelGrade, data });
};

const approveExcelGrade = async (req, res) => {
  const { excelGradeId } = req.body;

  if (!excelGradeId) {
    throw new CustomError("excelGradeId is required.", status.BAD_REQUEST);
  }

  const result = await Grades.approveExcelGrade(excelGradeId);
  res.send(result);
};

const addGrade = async (req, res) => {
  const schema = Joi.object({
    studentId: Joi.number().integer().required(),
    teacherId: Joi.number().integer().required(),
    departmentId: Joi.number().integer().required(),
    yearLevel: Joi.number().integer().min(1).max(4).required(),
    subjectId: Joi.number().integer().required(),
    schoolYearId: Joi.number().integer().required(),
    prelim: Joi.number().precision(2).required(),
    midterm: Joi.number().precision(2).required(),
    semifinal: Joi.number().precision(2).required(),
    final: Joi.number().precision(2).required(),
    average: Joi.number().precision(2).required(),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new CustomError(errorMessage, status.BAD_REQUEST);
  }

  const result = await Grades.addGrade(value);
  res.send({ message: "Grade added successfully.", result });
};

const getAllGrades = async (req, res) => {
  const grades = await Grades.getAllGrades();
  res.send(grades);
};

const getAllPendingGrades = async (req, res) => {
  const grades = await Grades.getAllPendingGrades();

  const grouped = grades.reduce((acc, grade) => {
    const key = [
      grade.teacherId,
      grade.departmentId,
      grade.yearLevel,
      grade.subjectId,
      grade.schoolYearId,
    ].join("|");

    if (!acc[key]) {
      acc[key] = {
        teacherId: grade.teacherId,
        teacherName: grade.teacherName,
        departmentId: grade.departmentId,
        departmentName: grade.departmentName,
        departmentShort: grade.departmentShort,
        yearLevel: grade.yearLevel,
        subjectId: grade.subjectId,
        subjectCode: grade.code,
        subjectName: grade.subjectName,
        schoolYearId: grade.schoolYearId,
        semester: grade.semester,
        schoolYearName: grade.schoolYearName,
        students: [],
      };
    }

    acc[key].students.push({
      gradeId: grade.gradeId,
      studentId: grade.studentId,
      studentName: grade.studentName,
      prelim: parseFloat(grade.prelim),
      midterm: parseFloat(grade.midterm),
      semifinal: parseFloat(grade.semifinal),
      final: parseFloat(grade.final),
      average: parseFloat(grade.average),
    });

    return acc;
  }, {});

  const groupedArray = Object.values(grouped);

  res.send(groupedArray);
};

const getGradeById = async (req, res) => {
  const { gradeId } = req.params;

  if (!gradeId) {
    throw new CustomError("gradeId is required.", status.BAD_REQUEST);
  }

  const grade = await Grades.getGradeById(gradeId);

  if (!grade) {
    throw new CustomError("Grade not found.", status.NOT_FOUND);
  }

  res.send(grade);
};

const getGradesByStudent = async (req, res) => {
  const { studentId, schoolYearId } = req.query;
  const result = await Grades.getStudentGrades(studentId, schoolYearId);
  res.send(result);
};

const getGradesByDepartment = async (req, res) => {
  const result = await Grades.getGradesByDepartment(req.query);
  res.send(result);
};

const approveGrades = async (req, res) => {
  const result = await Grades.approveGrades(req.body);
  res.send(result);
};

const submitGrades = async (req, res) => {
  const result = await Grades.submitGrades(req.body);
  res.send(result);
};

module.exports = {
  grades,
  uploadexcel,
  excelGrades,
  excelGrade,
  approveExcelGrade,
  addGrade,
  getAllGrades,
  getAllPendingGrades,
  getGradesByStudent,
  getGradesByDepartment,
  getGradeById,
  approveGrades,
  submitGrades,
};
