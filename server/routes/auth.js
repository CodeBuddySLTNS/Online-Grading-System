const { tryCatch } = require("../lib/utils");
const handler = require("../handlers/auth");

const router = require("express").Router();

router.get("/login", tryCatch(handler.login));
router.post("/login", tryCatch(handler.signup));

module.exports = router;
