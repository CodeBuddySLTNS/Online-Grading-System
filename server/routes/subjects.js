const { tryCatch } = require("../lib/utils");
const handler = require("../handlers/subjects");

const router = require("express").Router();

router.get("/", tryCatch(handler.subjects));
router.post("/add", tryCatch(handler.addSubject));
router.post("/add/departmentsubject", tryCatch(handler.addDepartmentSubject));

module.exports = router;
