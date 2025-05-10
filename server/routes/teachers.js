const { tryCatch } = require("../lib/utils");
const handler = require("../handlers/teachers");

const router = require("express").Router();

router.get("/", tryCatch(handler.teachers));
router.get("/teacher", tryCatch(handler.teachersById));
router.get("/departmentsubjects", tryCatch(handler.departmentSubjects));
router.post("/teacher/newdepartment", tryCatch(handler.addTeacherDepartment));

module.exports = router;
