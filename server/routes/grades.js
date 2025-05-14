const { tryCatch } = require("../lib/utils");
const handler = require("../handlers/grades");

const router = require("express").Router();

router.get("/", tryCatch(handler.grades));
router.post("/uploadexcel", tryCatch(handler.uploadexcel));
router.get("/excelgrades", tryCatch(handler.excelGrades));
router.get("/excelgrade", tryCatch(handler.excelGrade));
router.post("/excelgrades/approve", tryCatch(handler.approveExcelGrade));
module.exports = router;
