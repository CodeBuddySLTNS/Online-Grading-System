const Subject = require("../database/models/subjects");
const { CustomError } = require("../lib/utils");

const subjects = async (req, res) => {
  const subjects = await Subject.getAll();
  res.send(subjects);
};

const addSubject = async (req, res) => {
  const { code, subjectName } = req.body;

  if (!code || !subjectName) {
    throw new CustomError("Course Code and Name is required.");
  }

  const result = Subject.add(code, subjectName);
  res.send(result);
};

module.exports = { subjects, addSubject };
