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

  getTeacherById: async (teacherId) => {
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
      LEFT JOIN teacherDepartments td ON t.teacherId = td.teacherId
      LEFT JOIN departments d ON td.departmentId = d.departmentId
      WHERE t.teacherId = ?
    `;
    const results = await sqlQuery(query, [teacherId]);

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

  addTeacherDepartment: async (teacherId, departmentId, yearLevel) => {
    const query = `
      INSERT INTO teacherDepartments (teacherId, departmentId, yearLevel)
      VALUES (?, ?, ?)
    `;
    return await sqlQuery(query, [teacherId, departmentId, yearLevel]);
  },

  addTeacherDepartmentSubject: async (
    teacherId,
    departmentId,
    yearLevel,
    subjectId
  ) => {
    const query = `
      INSERT INTO teacherDepartmentSubjects (teacherId, departmentId, yearLevel, subjectId)
      VALUES (?, ?, ?, ?)
    `;
    return await sqlQuery(query, [teacherId, departmentId, yearLevel]);
  },
};

module.exports = Teacher;
