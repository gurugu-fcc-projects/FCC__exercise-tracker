const Exercise = require("./exercise.model");
const User = require("./user.model");

module.exports.createExercise = async (req, res) => {
  const userId = req.params.id;

  if (!req.body.description || !req.body.duration) {
    res.status(400).json({ error: "Please provide description and duration" });
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(400).json({ error: "There is no user with such ID" });
  }

  const exercise = await Exercise.create({
    user: userId,
    ...req.body,
  });

  res.status(200).json(exercise);
};
