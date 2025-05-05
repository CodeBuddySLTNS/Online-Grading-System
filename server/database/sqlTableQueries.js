module.exports.sqlTableQueries = `
    CREATE TABLE IF NOT EXISTS users (
        userId INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('student', 'teacher', 'registrar', 'admin') NOT NULL,
        firstName VARCHAR(50) NOT NULL,
        middleName VARCHAR(50),
        lastName VARCHAR(50) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS departments (
        departmentId INT AUTO_INCREMENT PRIMARY KEY,
        departmentName VARCHAR(100) NOT NULL,
        shortName VARCHAR(10) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS schoolYears (
        schoolYearId INT AUTO_INCREMENT PRIMARY KEY,
        schoolYearName VARCHAR(20) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS students (
        studentId INT PRIMARY KEY,
        departmentId INT NOT NULL,
        yearLevel TINYINT NOT NULL CHECK (yearLevel BETWEEN 1 AND 4),
        FOREIGN KEY (studentId) REFERENCES users(userId) ON DELETE CASCADE,
        FOREIGN KEY (departmentId) REFERENCES departments(departmentId) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS teachers (
        teacherId INT PRIMARY KEY,
        FOREIGN KEY (teacherId) REFERENCES users(userId) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS teacherDepartments (
        teacherId INT NOT NULL,
        departmentId INT NOT NULL,
        PRIMARY KEY (teacherId, departmentId),
        FOREIGN KEY (teacherId) REFERENCES teachers(teacherId) ON DELETE CASCADE,
        FOREIGN KEY (departmentId) REFERENCES departments(departmentId) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS subjects (
        subjectId INT AUTO_INCREMENT PRIMARY KEY,
        subjectName VARCHAR(100) NOT NULL,
        teacherId INT NOT NULL,
        departmentId INT NOT NULL,
        schoolYearId INT NOT NULL,
        semester TINYINT NOT NULL CHECK (semester IN (1, 2)),
        FOREIGN KEY (teacherId) REFERENCES teachers(teacherId) ON DELETE CASCADE,
        FOREIGN KEY (departmentId) REFERENCES departments(departmentId) ON DELETE CASCADE,
        FOREIGN KEY (schoolYearId) REFERENCES schoolYears(schoolYearId) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS grades (
        gradeId INT AUTO_INCREMENT PRIMARY KEY,
        studentId INT NOT NULL,
        subjectId INT NOT NULL,
        schoolYearId INT NOT NULL,
        gradeValue DECIMAL(5,2) NOT NULL,
        FOREIGN KEY (studentId) REFERENCES students(studentId) ON DELETE CASCADE,
        FOREIGN KEY (subjectId) REFERENCES subjects(subjectId) ON DELETE CASCADE,
        FOREIGN KEY (schoolYearId) REFERENCES schoolYears(schoolYearId) ON DELETE CASCADE
    );
`;
