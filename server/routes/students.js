const { tryCatch } = require("../lib/utils");
const handler = require("../handlers/students");

const router = require("express").Router();

router.get("/", tryCatch(handler.students));
router.get("/", tryCatch(handler.studentsBySubject));

module.exports = router;
