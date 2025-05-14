const sqlQuery = require("../sqlQuery");

const Grades = {
  addExcelGrade: async ({
    teacherId,
    departmentId,
    yearLevel,
    subjectId,
    schoolYearId,
    filePath,
  }) => {
    const query = `
      INSERT INTO excelGrades 
      (teacherId, departmentId, yearLevel, subjectId, schoolYearId, filePath)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      isApproved = 0`;
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

  getAllExcelGrades: async ({ pending }) => {
    const query = `SELECT eg.excelGradeId,
      CONCAT(u.firstName, ' ', u.lastName) AS teacher, 
      d.departmentName as department, d.shortName as departmentShort,
      s.subjectName as subject  , ds.semester, eg.yearLevel,
      sy.schoolYearName as schoolYear, eg.uploadDate
      FROM excelGrades eg
      JOIN users u ON u.userId = eg.teacherId
      JOIN subjects s ON s.subjectId = eg.subjectId
      JOIN departmentSubjects ds ON ds.subjectId = eg.subjectId
      JOIN schoolYears sy ON sy.schoolYearId = eg.schoolYearId
      JOIN departments d ON d.departmentId = eg.departmentId ${
        pending ? "WHERE isApproved = 0" : ""
      }`;
    return await sqlQuery(query);
  },

  getExcelGradesByDepartment: async ({
    teacherId,
    departmentId,
    yearLevel,
    subjectId,
    schoolYearId,
  }) => {
    const query = `SELECT eg.excelGradeId,
      CONCAT(u.firstName, ' ', u.lastName) AS teacher, 
      d.departmentName as department, d.shortName as departmentShort,
      s.subjectName as subject  , ds.semester, eg.yearLevel,
      sy.schoolYearName as schoolYear, eg.filePath, eg.uploadDate, eg.isApproved
      FROM excelGrades eg
      JOIN users u ON u.userId = eg.teacherId
      JOIN subjects s ON s.subjectId = eg.subjectId
      JOIN departmentSubjects ds ON ds.subjectId = eg.subjectId AND ds.departmentId = eg.departmentId
      JOIN schoolYears sy ON sy.schoolYearId = eg.schoolYearId
      JOIN departments d ON d.departmentId = eg.departmentId
      WHERE eg.teacherId = ? AND eg.departmentId = ? AND eg.yearLevel = ? AND eg.subjectId = ? AND eg.schoolYearId = ?`;
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
    const query = `SELECT eg.excelGradeId,
      CONCAT(u.firstName, ' ', u.lastName) AS teacher, 
      d.departmentName as department, d.shortName as departmentShort,
      s.subjectName as subject, ds.semester, eg.yearLevel,
      sy.schoolYearName as schoolYear, eg.filePath, eg.uploadDate, eg.isApproved
      FROM excelGrades eg
      JOIN users u ON u.userId = eg.teacherId
      JOIN subjects s ON s.subjectId = eg.subjectId
      JOIN departmentSubjects ds ON ds.subjectId = eg.subjectId
      JOIN schoolYears sy ON sy.schoolYearId = eg.schoolYearId
      JOIN departments d ON d.departmentId = eg.departmentId
      WHERE excelGradeId = ?`;
    return (await sqlQuery(query, [excelGradeId]))[0];
  },

  approveExcelGrade: async (excelGradeId) => {
    const query = `UPDATE excelGrades SET isApproved = 1 WHERE excelGradeId = ?`;
    return await sqlQuery(query, [excelGradeId]);
  },
};

module.exports = Grades;
