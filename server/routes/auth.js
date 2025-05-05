const { tryCatch } = require("../lib/utils");
const handler = require("../handlers/auth");

const router = require("express").Router();

router.post("/login", tryCatch(handler.login));
router.post("/signup", tryCatch(handler.signup));

module.exports = router;
