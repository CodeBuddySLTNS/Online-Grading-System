const sqlQuery = require("../sqlQuery");

const Subject = {
  getAll: async () => {
    const query = `SELECT * FROM subjects`;
    return await sqlQuery(query);
  },

  add: async (code, subjectName) => {
    const query = `INSERT INTO subjects (code, subjectName) VALUES (?, ?)`;
    const params = [code, subjectName];
    return await sqlQuery(query);
  },
};

module.exports = Subject;
