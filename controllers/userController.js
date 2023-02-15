const { User, Thought } = require('../models');

// Get all users
function getUsers(req, res) {
   User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
}

// Get a single user
function getSingleUser(req, res) {
   User.findOne({ _id: req.params.id })
      // .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then((user) =>
         !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
}

module.exports = {
   getUsers,
   getSingleUser,
}