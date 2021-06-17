const express = require("express");

const { createUser, getUsers } = require("./user.controllers");
const { createExercise, getExercises } = require("./exercise.controllers");

const router = express.Router();

router.route("/").post(createUser).get(getUsers);
router.post("/:id/exercises", createExercise);
router.get("/:id/logs", getExercises);

module.exports = router;
