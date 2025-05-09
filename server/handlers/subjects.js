const Joi = require("joi");
const Subject = require("../database/models/subjects");
const { CustomError } = require("../lib/utils");
const { default: status } = require("http-status");

const subjects = async (req, res) => {
  const subjects = await Subject.getAll();
  res.send(subjects);
};

const addSubject = async (req, res) => {
  const { code, subjectName } = req.body;

  if (!code || !subjectName) {
    throw new CustomError("Course Code and Name is required.");
  }

  const result = await Subject.add(code, subjectName);
  res.send(result);
};

const departmentSubjects = async (req, res) => {
  const { departmentId, yearLevel } = req.query;

  if (!departmentId || !yearLevel) {
    throw new CustomError(
      "departmentId and yearLevel is required.",
      status.BAD_REQUEST
    );
  }

  const departmentSubjects = await Subject.getDepartmentSubjects(
    departmentId,
    yearLevel
  );

  console.log(departmentSubjects);
  res.send(departmentSubjects);
};

const addDepartmentSubject = async (req, res) => {
  const schema = Joi.object({
    subjectId: Joi.number().integer().required().messages({
      "number.base": "Subject ID must be a number.",
      "any.required": "Subject ID is required.",
    }),
    departmentId: Joi.number().integer().required().messages({
      "number.base": "Department ID must be a number.",
      "any.required": "Department ID is required.",
    }),
    yearLevel: Joi.number().integer().min(1).max(4).required().messages({
      "number.base": "Year Level must be a number.",
      "number.min": "Year Level must be at least 1.",
      "number.max": "Year Level must be at most 4.",
      "any.required": "Year Level is required.",
    }),
    semester: Joi.number().integer().valid(1, 2).required().messages({
      "number.base": "Semester must be a number.",
      "any.only": "Semester must be either 1 or 2.",
      "any.required": "Semester is required.",
    }),
  });

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new CustomError(errorMessage);
  }

  const result = await Subject.addDepartmentSubject(value);
  res.send(result);
};

module.exports = {
  subjects,
  addSubject,
  addDepartmentSubject,
  departmentSubjects,
};
