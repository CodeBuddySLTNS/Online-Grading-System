const sqlQuery = require("../sqlQuery");

const Teacher = {
  getAllWithDepartments: async () => {
    const query = `
      SELECT 
        t.teacherId, 
        CONCAT(u.firstName, ' ', u.lastName) AS teacherName, 
        d.departmentId, 
        d.departmentName, 
        td.yearLevel
      FROM teachers t
      JOIN users u ON t.teacherId = u.userId
      LEFT JOIN teacherDepartments td ON t.teacherId = td.teacherId
      LEFT JOIN departments d ON td.departmentId = d.departmentId
    `;
    const results = await sqlQuery(query);

    const grouped = results.reduce((acc, row) => {
      const {
        teacherId,
        teacherName,
        departmentId,
        departmentName,
        yearLevel,
      } = row;
      if (!acc[teacherId]) {
        acc[teacherId] = { teacherId, teacherName, departments: {} };
      }
      if (departmentId && departmentName) {
        if (!acc[teacherId].departments[yearLevel]) {
          acc[teacherId].departments[yearLevel] = [];
        }
        acc[teacherId].departments[yearLevel].push({
          departmentId,
          name: departmentName,
        });
      }
      return acc;
    }, {});

    return Object.values(grouped);
  },

  getTeacherById: async (teacherId, schoolYearId) => {
    const query = `
      SELECT 
        t.teacherId, 
        CONCAT(u.firstName, ' ', u.lastName) AS teacherName, 
        d.departmentId, 
        d.departmentName, 
        d.shortName,
        td.yearLevel
      FROM teachers t
      JOIN users u ON t.teacherId = u.userId
      LEFT JOIN teacherDepartments td ON t.teacherId = td.teacherId AND td.schoolYearId = ?
      LEFT JOIN departments d ON td.departmentId = d.departmentId
      WHERE t.teacherId = ?
    `;
    console.log(schoolYearId);
    const results = await sqlQuery(query, [schoolYearId, teacherId]);

    const grouped = results.reduce((acc, row) => {
      const {
        teacherId,
        teacherName,
        departmentId,
        departmentName,
        shortName,
        yearLevel,
      } = row;
      if (!acc[teacherId]) {
        acc[teacherId] = { teacherId, teacherName, departments: {} };
      }
      if (departmentId && departmentName) {
        if (!acc[teacherId].departments[yearLevel]) {
          acc[teacherId].departments[yearLevel] = [];
        }
        acc[teacherId].departments[yearLevel].push({
          departmentId,
          name: departmentName,
          short: shortName,
        });
      }
      return acc;
    }, {});

    return Object.values(grouped)[0];
  },

  getDepartmentSubjects: async (teacherId, departmentId, yearLevel, sy) => {
    const query = `SELECT s.*, ds.semester 
      FROM teacherDepartmentSubjects tds
      JOIN departmentSubjects ds 
        ON tds.departmentId = ds.departmentId 
        AND tds.yearLevel = ds.yearLevel 
        AND tds.subjectId = ds.subjectId
      JOIN subjects s 
        ON tds.subjectId = s.subjectId
      WHERE tds.teacherId = ? 
        AND tds.departmentId = ? 
        AND tds.yearLevel = ?
        AND tds.schoolYearId = ?`;
    return await sqlQuery(query, [teacherId, departmentId, yearLevel, sy]);
  },

  addTeacherDepartment: async (
    teacherId,
    departmentId,
    yearLevel,
    schoolYearId
  ) => {
    const query = `
      INSERT IGNORE INTO teacherDepartments (teacherId, departmentId, yearLevel, schoolYearId)
      VALUES (?, ?, ?, ?)
    `;
    return await sqlQuery(query, [
      teacherId,
      departmentId,
      yearLevel,
      schoolYearId,
    ]);
  },

  addTeacherDepartmentSubject: async (
    teacherId,
    departmentId,
    yearLevel,
    subjectId,
    schoolYearId
  ) => {
    const query = `
      INSERT INTO teacherDepartmentSubjects (teacherId, departmentId, yearLevel, subjectId, schoolYearId)
      VALUES (?, ?, ?, ?, ?)
    `;
    return await sqlQuery(query, [
      teacherId,
      departmentId,
      yearLevel,
      subjectId,
      schoolYearId,
    ]);
  },
};

module.exports = Teacher;
