const sqlQuery = require("../sqlQuery");
const Department = require("./department");

const User = {
  getAll: async () => {
    const query = `SELECT * FROM users`;
    return sqlQuery(query);
  },
  getUserById: async (id) => {
    const query = `SELECT 
        u.userId, u.username, u.role, u.firstName, u.middleName, u.lastName,
        s.*,
        d.*
      FROM users u
      LEFT JOIN students s ON u.userId = s.studentId
      LEFT JOIN departments d ON s.departmentId = d.departmentId
      WHERE userId = ?`;
    return (await sqlQuery(query, [id]))[0];
  },
  getUserByUsername: async (username) => {
    const query = `SELECT 
        u.*,
        s.*,
        d.*
      FROM users u
      LEFT JOIN students s ON u.userId = s.studentId
      LEFT JOIN departments d ON s.departmentId = d.departmentId
      WHERE u.username = ?;
    `;
    return (await sqlQuery(query, [username]))[0];
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
      console.log(department);
      switch (data.role || "student") {
        case "student":
          newQuery = `INSERT INTO students (studentId, departmentId, yearLevel)
              VALUES (?, ?, ?)`;
          await sqlQuery(newQuery, [
            rows.insertId,
            department.departmentId,
            data.year,
          ]);
          break;

        case "teacher":
          newQuery = `INSERT INTO teachers (teacherId) VALUES (?)`;
          await sqlQuery(newQuery, [rows.insertId]);
          break;
      }
    }

    return rows.insertId;
  },
};

module.exports = User;
