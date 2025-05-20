const { tryCatch } = require("../lib/utils");
const handler = require("../handlers/registrar");

const router = require("express").Router();

router.get("/sy", tryCatch(handler.schoolYears));
router.post("/addsy", tryCatch(handler.addSchoolYear));
router.post("/adduser", tryCatch(handler.addUser));

module.exports = router;
