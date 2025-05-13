const sqlQuery = require("../sqlQuery");

const Grades = {
  addExcelGrade: async ({
    teacherId,
    departmentId,
    yearLevel,
    subjectId,
    schoolYearId,
  }) => {
    const query = `INSERT INTO excelGrades 
    (teacherId, departmentId, yearLevel, subjectId, schoolYearId, filePath)
    VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [
      teacherId,
      departmentId,
      yearLevel,
      subjectId,
      schoolYearId,
      filePath,
    ];
    return await sqlQuery(query, params);
  },

  getAllExcelGrades: async () => {
    const query = `SELECT eg.excelGradeId,
      CONCAT(u.firstName, ' ', u.lastName) AS teacher, 
      d.departmentName as department, d.shortName as departmentShort,
      eg.yearLevel, sy.schoolYearName as schoolYear, eg.uploadDate
      FROM excelGrades eg
      JOIN users u ON u.userId = eg.teacherId
      JOIN schoolYears sy ON sy.schoolYearId = eg.schoolYearId
      JOIN departments d ON d.departmentId = eg.departmentId`;
    return await sqlQuery(query);
  },

  getExcelGradesByDepartment: async ({
    teacherId,
    departmentId,
    yearLevel,
    subjectId,
    schoolYearId,
  }) => {
    const query = `
    SELECT * FROM excelGrades
    WHERE teacherId = ? AND departmentId = ? AND yearLevel = ? AND subjectId = ? AND schoolYearId = ?
  `;
    const params = [
      teacherId,
      departmentId,
      yearLevel,
      subjectId,
      schoolYearId,
    ];
    return (await sqlQuery(query, params))[0];
  },

  getExcelGradesById: async (excelGradeId) => {
    const query = `
    SELECT filePath FROM excelGrades WHERE excelGradeId = ?
  `;
    return (await sqlQuery(query, [excelGradeId]))[0];
  },
};

module.exports = Grades;
