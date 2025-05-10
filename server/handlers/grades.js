const Joi = require("joi");
const XLSX = require("xlsx");
const sqlQuery = require("../database/sqlQuery");
const { CustomError } = require("../lib/utils");
const { default: status } = require("http-status");

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

  const {
    teacherId,
    departmentId,
    yearLevel,
    subjectId,
    schoolYearId,
    excelData,
    fileName,
  } = value;

  const filePath = "./excel-files/" + fileName;

  const ws = XLSX.utils.aoa_to_sheet(excelData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  await XLSX.writeFile(wb, filePath);

  const query = `
    INSERT INTO excelGrades (teacherId, departmentId, yearLevel, subjectId, schoolYearId, filePath)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [
    teacherId,
    departmentId,
    yearLevel,
    subjectId,
    schoolYearId,
    filePath,
  ];
  const result = await sqlQuery(query, params);

  res.send({ message: "Changes saved successfully.", result });
};

const getExcelGrade = async (req, res) => {
  const data = await getExcelGradesByTeacherDepartmentSubject(req.query);

  let excelGradeId = data[0]?.excelGradeId;

  if (!excelGradeId) {
    return res.send([]);
  }

  const query = `
    SELECT filePath FROM excelGrades WHERE excelGradeId = ?
  `;
  const params = [excelGradeId];
  const result = await sqlQuery(query, params);

  if (result.length === 0) {
    throw new CustomError("Excel Grade not found.", status.NOT_FOUND);
  }

  const filePath = result[0].filePath;

  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    res.send(data);
  } catch (error) {
    throw new CustomError(
      "Error reading the Excel file.",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

const getExcelGradesByTeacherDepartmentSubject = async (data) => {
  const { teacherId, departmentId, yearLevel, subjectId, schoolYearId } = data;

  if (
    !teacherId ||
    !departmentId ||
    !yearLevel ||
    !subjectId ||
    !schoolYearId
  ) {
    throw new CustomError(
      "All parameters (teacherId, departmentId, yearLevel, subjectId, schoolYearId) are required.",
      status.BAD_REQUEST
    );
  }

  const query = `
    SELECT * FROM excelGrades
    WHERE teacherId = ? AND departmentId = ? AND yearLevel = ? AND subjectId = ? AND schoolYearId = ?
  `;
  const params = [teacherId, departmentId, yearLevel, subjectId, schoolYearId];
  const result = await sqlQuery(query, params);

  return result;
};

module.exports = {
  grades,
  uploadexcel,
  getExcelGrade,
};
