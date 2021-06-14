const express = require("express");
const { createUser, getUsers } = require("./user.controllers");

const router = express.Router();

router.route("/").post(createUser).get(getUsers);

module.exports = router;
