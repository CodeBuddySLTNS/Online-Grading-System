const sqlQuery = require("../sqlQuery");

const User = {
  add: async (data) => {
    const query = `INSERT INTO users (username, password, role, firstName, middleName, lastName)
        VALUES (?, ?, ?, ?, ?, ?);`;
    const params = [
      data.username,
      data.password,
      data.role,
      data.firstName,
      data.middleName,
      data.lastName,
    ];
    const rows = await sqlQuery(query, params);

    console.log(rows);

    switch (data.role) {
      case "student":
        // const query = `INSERT INTO students (studentId, departmentId, yearLevel)
        //     VALUES (?, ?, ?);`;
        // const params = [];
        // sqlQuery(query, params);

        break;

      default:
        break;
    }
  },
};

module.exports = User;
