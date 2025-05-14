const sqlQuery = require("../sqlQuery");

const Student = {
  getAllByDepartmentAndYear: async (departmentId, yearLevel) => {
    const query = `
      SELECT 
        u.userId, u.username, u.firstName, u.middleName, u.lastName, s.yearLevel,
        d.departmentId, d.departmentName, d.shortName AS departmentShort
      FROM students s
      INNER JOIN users u ON s.studentId = u.userId
      JOIN departments d ON s.departmentId = d.departmentId
      WHERE s.departmentId = ? AND s.yearLevel = ?;
    `;

    return await sqlQuery(query, [departmentId, yearLevel]);
  },

  addStudentSubject: async ({
    studentId,
    teacherId,
    departmentId,
    yearLevel,
    schoolYearId,
    subjectId,
  }) => {
    const query = `
      INSERT INTO studentSubjects 
      (studentId, teacherId, departmentId, yearLevel, schoolYearId, subjectId)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      teacherId = VALUES(teacherId)`;
    const params = [
      studentId,
      teacherId,
      departmentId,
      yearLevel,
      schoolYearId,
      subjectId,
    ];
    return await sqlQuery(query, params);
  },

  getAllStudentSubjects: async () => {
    const query = `
      SELECT ss.studentId, CONCAT(u.firstName, ' ', u.lastName) AS studentName,
        ss.teacherId, CONCAT(tu.firstName, ' ', tu.lastName) AS teacherName,
        ss.departmentId, d.departmentName, ss.yearLevel, ss.subjectId, s.subjectName,
        ss.schoolYearId, sy.schoolYearName
      FROM studentSubjects ss
      JOIN users u ON u.userId = ss.studentId
      JOIN users tu ON tu.userId = ss.teacherId
      JOIN departments d ON d.departmentId = ss.departmentId
      JOIN subjects s ON s.subjectId = ss.subjectId
      JOIN schoolYears sy ON sy.schoolYearId = ss.schoolYearId`;
    return await sqlQuery(query);
  },

  getStudentSubjectById: async (studentId, subjectId, schoolYearId) => {
    const query = `
      SELECT ss.studentId, CONCAT(u.firstName, ' ', u.lastName) AS studentName,
        ss.teacherId, CONCAT(tu.firstName, ' ', tu.lastName) AS teacherName,
        ss.departmentId, d.departmentName, ss.yearLevel, ss.subjectId, s.subjectName,
        ss.schoolYearId, sy.schoolYearName
      FROM studentSubjects ss
      JOIN users u ON u.userId = ss.studentId
      JOIN users tu ON tu.userId = ss.teacherId
      JOIN departments d ON d.departmentId = ss.departmentId
      JOIN subjects s ON s.subjectId = ss.subjectId
      JOIN schoolYears sy ON sy.schoolYearId = ss.schoolYearId
      WHERE ss.studentId = ? AND ss.subjectId = ? AND ss.schoolYearId = ?`;
    const params = [studentId, subjectId, schoolYearId];
    return (await sqlQuery(query, params))[0];
  },
};

module.exports = Student;
