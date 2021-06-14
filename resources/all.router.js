const express = require("express");

const { createUser, getUsers } = require("./user.controllers");
const { createExercise } = require("./exercise.controllers");

const router = express.Router();

router.route("/").post(createUser).get(getUsers);
router.post("/:id/exercises", createExercise);

module.exports = router;
