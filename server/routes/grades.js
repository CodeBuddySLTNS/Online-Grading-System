const { tryCatch } = require("../lib/utils");
const handler = require("../handlers/grades");

const router = require("express").Router();

router.get("/", tryCatch(handler.grades));
router.post("/uploadexcel", tryCatch(handler.uploadexcel));
router.get("/excelgrade", tryCatch(handler.getExcelGrade));

module.exports = router;
