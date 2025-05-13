const Joi = require("joi");
const XLSX = require("xlsx");
const sqlQuery = require("../database/sqlQuery");
const { CustomError } = require("../lib/utils");
const { default: status } = require("http-status");
const Grades = require("../database/models/grades");

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
  const excelGrades = await Grades.getAllExcelGrades();
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

module.exports = {
  grades,
  uploadexcel,
  excelGrades,
  excelGrade,
};
