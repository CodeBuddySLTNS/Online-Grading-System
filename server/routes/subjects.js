const { tryCatch } = require("../lib/utils");
const handler = require("../handlers/subjects");

const router = require("express").Router();

router.get("/", tryCatch(handler.subjects));
router.post("/add", tryCatch(handler.addSubject));
router.get("/departmentsubjects", tryCatch(handler.departmentSubjects));
router.post("/departmentsubjects/add", tryCatch(handler.addDepartmentSubject));

module.exports = router;
