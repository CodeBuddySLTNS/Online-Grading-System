const sqlQuery = require("../sqlQuery");

/*

INSERT INTO departments(departmentName, shortName) VALUES
  ("Bachelor of Science in Computer Science", "BSCS"),
  ("Bachelor of Science in Information Technology", "BSIT"),
  ("Bachelor of Science in Social Work", "BSSW");

*/

const Department = {
  getAll: async () => {
    const query = `SELECT * FROM departments`;
    return await sqlQuery(query);
  },
  getDepartmentByName: async (name) => {
    const query = `SELECT * FROM departments WHERE departmentName = ? LIMIT 1`;
    return (await sqlQuery(query, [name]))[0];
  },
  add: async (data) => {},
};

module.exports = Department;
