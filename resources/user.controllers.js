const User = require("./user.model");

module.exports.createUser = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    res.status(400).json({ error: "Please provide username" });
  }

  let user = await User.findOne({ username });

  if (!user) {
    user = new User({ username });
    await user.save();
  }

  res.status(200).json({ username: user.username, _id: user._id });
};

module.exports.getUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
};
