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

  const exercise = new Exercise({
    user: userId,
    date: req.body.date ? new Date(req.body.date) : Date.now(),
    description: req.body.description,
    duration: req.body.duration,
  });

  await exercise.save();

  const returnObject = {
    _id: user._id,
    username: user.username,
    date: exercise.date.toDateString(),
    duration: exercise.duration,
    description: exercise.description,
  };

  res.status(200).json(returnObject);
};

module.exports.getExercises = async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(400).json({ error: "There is no user with such ID" });
  }

  const query = Exercise.find({ user: userId });

  if (req.query.limit) {
    query.limit(+req.query.limit);
  }
  if (req.query.from) {
    query.where('date').gte(new Date(req.query.from));
  }
  if (req.query.to) {
    query.where('date').lte(new Date(req.query.to));
  }

  const exercises = await query.exec();

  const convertedExercises = exercises.map(exercise => ({
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date.toDateString(),
  }));

  const returnObject = {
    _id: user._id,
    username: user.username,
    count: convertedExercises.length,
    log: convertedExercises,
  };

  res.status(200).json(returnObject);
};
