const { tryCatch } = require("../lib/utils");
const handler = require("../handlers/grades");

const router = require("express").Router();

router.get("/", tryCatch(handler.grades));
router.get("/uploadexcel", tryCatch(handler.grades));

module.exports = router;
