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

  addGrade: async ({
    studentId,
    teacherId,
    departmentId,
    yearLevel,
    subjectId,
    schoolYearId,
    prelim,
    midterm,
    semifinal,
    final,
    average,
  }) => {
    const query = `
      INSERT INTO grades 
      (studentId, teacherId, departmentId, yearLevel, subjectId, schoolYearId, prelim, midterm, semifinal, final, average)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      prelim = VALUES(prelim),
      midterm = VALUES(midterm),
      semifinal = VALUES(semifinal),
      final = VALUES(final),
      average = VALUES(average)`;
    const params = [
      studentId,
      teacherId,
      departmentId,
      yearLevel,
      subjectId,
      schoolYearId,
      prelim,
      midterm,
      semifinal,
      final,
      average,
    ];
    return await sqlQuery(query, params);
  },

  getAllGrades: async () => {
    const query = `
      SELECT g.gradeId, g.studentId, CONCAT(u.firstName, ' ', u.lastName) AS studentName,
        g.teacherId, CONCAT(tu.firstName, ' ', tu.lastName) AS teacherName,
        g.departmentId, d.departmentName, g.yearLevel, g.subjectId, s.subjectName,
        g.schoolYearId, sy.schoolYearName, g.prelim, g.midterm, g.semifinal, g.final, g.average
      FROM grades g
      JOIN users u ON u.userId = g.studentId
      JOIN users tu ON tu.userId = g.teacherId
      JOIN departments d ON d.departmentId = g.departmentId
      JOIN subjects s ON s.subjectId = g.subjectId
      JOIN schoolYears sy ON sy.schoolYearId = g.schoolYearId`;
    return await sqlQuery(query);
  },

  getGradeById: async (gradeId) => {
    const query = `
      SELECT g.gradeId, g.studentId, CONCAT(u.firstName, ' ', u.lastName) AS studentName,
        g.teacherId, CONCAT(tu.firstName, ' ', tu.lastName) AS teacherName,
        g.departmentId, d.departmentName, g.yearLevel, g.subjectId, s.subjectName,
        g.schoolYearId, sy.schoolYearName, g.prelim, g.midterm, g.semifinal, g.final, g.average
      FROM grades g
      JOIN users u ON u.userId = g.studentId
      JOIN users tu ON tu.userId = g.teacherId
      JOIN departments d ON d.departmentId = g.departmentId
      JOIN subjects s ON s.subjectId = g.subjectId
      JOIN schoolYears sy ON sy.schoolYearId = g.schoolYearId
      WHERE g.gradeId = ?`;
    return (await sqlQuery(query, [gradeId]))[0];
  },

  getGradesByStudentId: async (studentId) => {
    const query = `
      SELECT g.gradeId, g.studentId, CONCAT(u.firstName, ' ', u.lastName) AS studentName,
        g.teacherId, CONCAT(tu.firstName, ' ', tu.lastName) AS teacherName,
        g.departmentId, d.departmentName, g.yearLevel, g.subjectId, s.subjectName,
        g.schoolYearId, sy.schoolYearName, g.prelim, g.midterm, g.semifinal, g.final, g.average
      FROM grades g
      JOIN users u ON u.userId = g.studentId
      JOIN users tu ON tu.userId = g.teacherId
      JOIN departments d ON d.departmentId = g.departmentId
      JOIN subjects s ON s.subjectId = g.subjectId
      JOIN schoolYears sy ON sy.schoolYearId = g.schoolYearId
      WHERE g.studentId = ?`;
    return await sqlQuery(query, [studentId]);
  },

  submitGrades: async ({
    teacherId,
    departmentId,
    yearLevel,
    subjectId,
    schoolYearId,
  }) => {
    const query = `
      UPDATE grades
      SET isSubmitted = TRUE
      WHERE 
        AND teacherId = ?
        AND departmentId = ?
        AND yearLevel = ?
        AND subjectId = ?
        AND schoolYearId = ?`;
    return await sqlQuery(query, [
      teacherId,
      departmentId,
      yearLevel,
      subjectId,
      schoolYearId,
    ]);
  },

  approveGrades: async ({
    teacherId,
    departmentId,
    yearLevel,
    subjectId,
    schoolYearId,
  }) => {
    const query = `
      UPDATE grades
      SET isApproved = TRUE
      WHERE 
        AND teacherId = ?
        AND departmentId = ?
        AND yearLevel = ?
        AND subjectId = ?
        AND schoolYearId = ?`;
    return await sqlQuery(query, [
      teacherId,
      departmentId,
      yearLevel,
      subjectId,
      schoolYearId,
    ]);
  },
};

module.exports = Grades;
