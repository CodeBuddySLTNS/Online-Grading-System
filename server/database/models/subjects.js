const sqlQuery = require("../sqlQuery");

const Subject = {
  getAll: async () => {
    const query = `SELECT * FROM subjects`;
    return await sqlQuery(query);
  },

  add: async (code, subjectName) => {
    const query = `INSERT INTO subejcts (code, subjectName) VALUES (?, ?)`;
    const params = [code, subjectName];
    return await sqlQuery(query, params);
  },

  addDepartmentSubject: async ({
    subjectId,
    departmentId,
    yearLevel,
    semester,
  }) => {
    const query = `INSERT INTO departmentSubjects (subjectId, departmentId, yearLevel, semester) VALUES (?, ?, ?, ?)`;
    const params = [subjectId, departmentId, yearLevel, semester];
    return await sqlQuery(query, params);
  },
};

module.exports = Subject;
