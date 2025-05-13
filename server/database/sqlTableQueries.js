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
        departmentName VARCHAR(100) NOT NULL UNIQUE,
        shortName VARCHAR(10) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS schoolYears (
        schoolYearId INT AUTO_INCREMENT PRIMARY KEY,
        schoolYearName VARCHAR(20) NOT NULL UNIQUE
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
        yearLevel TINYINT NOT NULL CHECK (yearLevel BETWEEN 1 AND 4),
        schoolYearId INT NOT NULL,
        PRIMARY KEY (teacherId, departmentId, yearLevel, schoolYearId),
        FOREIGN KEY (teacherId) REFERENCES teachers(teacherId) ON DELETE CASCADE,
        FOREIGN KEY (departmentId) REFERENCES departments(departmentId) ON DELETE CASCADE,
        FOREIGN KEY (schoolYearId) REFERENCES schoolYears(schoolYearId) ON DELETE CASCADE
    );

    
    CREATE TABLE IF NOT EXISTS teacherDepartmentSubjects (
        teacherId INT NOT NULL,
        subjectId INT NOT NULL,
        departmentId INT NOT NULL,
        yearLevel TINYINT NOT NULL CHECK (yearLevel BETWEEN 1 AND 4),
        schoolYearId INT NOT NULL,
        PRIMARY KEY (teacherId, departmentId, yearLevel, subjectId, schoolYearId),
        FOREIGN KEY (teacherId, departmentId, yearLevel, schoolYearId)
        REFERENCES teacherDepartments(teacherId, departmentId, yearLevel, schoolYearId) ON DELETE CASCADE,
        FOREIGN KEY (subjectId) REFERENCES subjects(subjectId) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS subjects (
        subjectId INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(10) NOT NULL UNIQUE,
        subjectName VARCHAR(100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS departmentSubjects (
        subjectId INT NOT NULL,
        departmentId INT NOT NULL,
        yearLevel TINYINT NOT NULL CHECK (yearLevel BETWEEN 1 AND 4),
        semester TINYINT NOT NULL CHECK (semester IN (1, 2)),
        PRIMARY KEY (departmentId, subjectId),
        FOREIGN KEY (departmentId) REFERENCES departments(departmentId) ON DELETE CASCADE,
        FOREIGN KEY (subjectId) REFERENCES subjects(subjectId) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS studentSubjects (
        studentId INT NOT NULL,
        teacherId INT NOT NULL,
        departmentId INT NOT NULL,
        yearLevel TINYINT NOT NULL,
        schoolYearId INT NOT NULL,
        subjectId INT NOT NULL,
        PRIMARY KEY (studentId, subjectId, schoolYearId),
        FOREIGN KEY (studentId) REFERENCES students(studentId) ON DELETE CASCADE,
        FOREIGN KEY (teacherId) REFERENCES teachers(teacherId) ON DELETE CASCADE,
        FOREIGN KEY (departmentId) REFERENCES departments(departmentId) ON DELETE CASCADE,
        FOREIGN KEY (schoolYearId) REFERENCES schoolYears(schoolYearId) ON DELETE CASCADE,
        FOREIGN KEY (subjectId) REFERENCES subjects(subjectId) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS excelGrades (
        excelGradeId INT AUTO_INCREMENT PRIMARY KEY,
        teacherId INT NOT NULL,
        departmentId INT NOT NULL,
        yearLevel TINYINT NOT NULL CHECK (yearLevel BETWEEN 1 AND 4),
        subjectId INT NOT NULL,
        schoolYearId INT NOT NULL,
        filePath VARCHAR(255) NOT NULL,
        isApproved BOOlEAN DEFAULT false,
        uploadDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (teacherId, departmentId, yearLevel, subjectId, schoolYearId)
            REFERENCES teacherDepartmentSubjects(teacherId, departmentId, yearLevel, subjectId, schoolYearId) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS grades (
        gradeId INT AUTO_INCREMENT PRIMARY KEY,
        studentId INT NOT NULL,
        teacherId INT NOT NULL,
        departmentId INT NOT NULL,
        yearLevel TINYINT NOT NULL CHECK (yearLevel BETWEEN 1 AND 4),
        subjectId INT NOT NULL,
        schoolYearId INT NOT NULL,
        gradeValue DECIMAL(5,2) NOT NULL,
        FOREIGN KEY (studentId) REFERENCES students(studentId) ON DELETE CASCADE,
        FOREIGN KEY (teacherId, departmentId, yearLevel, subjectId)
            REFERENCES teacherDepartmentSubjects(teacherId, departmentId, yearLevel, subjectId) ON DELETE CASCADE,
        FOREIGN KEY (schoolYearId) REFERENCES schoolYears(schoolYearId) ON DELETE CASCADE
    );
`;
