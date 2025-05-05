const { tryCatch } = require("../lib/utils");
const handler = require("../handlers/departments");

const router = require("express").Router();

router.get("/", tryCatch(handler.departments));

module.exports = router;
