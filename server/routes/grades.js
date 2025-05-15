const { tryCatch } = require("../lib/utils");
const handler = require("../handlers/grades");

const router = require("express").Router();

router.get("/", tryCatch(handler.grades));
router.post("/uploadexcel", tryCatch(handler.uploadexcel));
router.get("/excelgrades", tryCatch(handler.excelGrades));
router.get("/excelgrade", tryCatch(handler.excelGrade));
router.post("/excelgrades/approve", tryCatch(handler.approveExcelGrade));

router.post("/add", tryCatch(handler.addGrade));
router.get("/all", tryCatch(handler.getAllGrades));
router.get("/pending", tryCatch(handler.getAllPendingGrades));
router.get("/:gradeId", tryCatch(handler.getGradeById));
router.post("/approve", tryCatch(handler.approveGrades));
router.post("/submit", tryCatch(handler.submitGrades));
module.exports = router;
