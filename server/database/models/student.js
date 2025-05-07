const sqlQuery = require("../sqlQuery");

const Student = {
  getAllByDepartmentAndYear: async (departmentId, yearLevel) => {
    const query = `
      SELECT 
        u.userId, u.username, u.firstName, u.middleName, u.lastName, s.yearLevel
      FROM 
        students s
      INNER JOIN 
        users u ON s.studentId = u.userId
      WHERE 
        s.departmentId = ? AND s.yearLevel = ?;
    `;

    return await sqlQuery(query, [departmentId, yearLevel]);
  },
};

module.exports = Student;
