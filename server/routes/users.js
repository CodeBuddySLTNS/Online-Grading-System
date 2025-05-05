const { tryCatch } = require("../lib/utils");
const handler = require("../handlers/users");

const router = require("express").Router();

router.get("/", tryCatch(handler.users));
router.get("/user/me", tryCatch(handler.userInfo));

module.exports = router;
