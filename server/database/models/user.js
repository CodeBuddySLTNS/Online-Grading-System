const sqlQuery = require("../sqlQuery");
const Department = require("./department");

const User = {
  getAll: async () => {
    const query = `SELECT * FROM users`;
    return sqlQuery(query);
  },
  getUserById: async (id) => {
    const query = `SELECT userId, username, role, firstName, middleName, lastName FROM users WHERE userId = ?`;
    return (await sqlQuery(query, [id]))[0];
  },
  getUserByUsername: async (id) => {
    const query = `SELECT * FROM users WHERE username = ?`;
    return (await sqlQuery(query, [id]))[0];
  },
  add: async (data) => {
    const query = `INSERT INTO users (username, password, role, firstName, middleName, lastName)
        VALUES (?, ?, ?, ?, ?, ?);`;
    const params = [
      data.username,
      data.password,
      data.role || "student",
      data.firstName,
      data.middleName,
      data.lastName,
    ];
    const rows = await sqlQuery(query, params);

    if (rows.insertId) {
      let newQuery;
      const department = await Department.getDepartmentByName(data.department);

      switch (data.role) {
        case "student":
          newQuery = `INSERT INTO students (studentId, departmentId, yearLevel)
              VALUES (?, ?, ?)`;
          sqlQuery(query, [
            rows.insertId,
            department[0].departmentId,
            data.year,
          ]);
          break;

        case "teacher":
          newQuery = `INSERT INTO teachers (teacherId) VALUES (?)`;
          sqlQuery(query, [rows.insertId]);
          break;
      }
    }

    return rows.insertId;
  },
};

module.exports = User;
