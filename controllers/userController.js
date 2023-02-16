const { User, Thought } = require('../models');

// get all users
function getUsers(req, res) {
   User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
}

// get a single user
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

// create a new user
function createUser(req, res) {
   User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
}

// update a user by id
function updateUser(req, res) {
   User.findOneAndUpdate(
      { _id: req.params.id },
      { username: req.body.username }
   )
      .then((user) => {
         !user
            ? res.status(404).json({ message: `No user with that ID` })
            : res.json({ message: `User ${user._id} has been updated.` })
      })
      .catch((err) => res.status(500).json(err));
}

// delete a user by id
// also deletes user's associated thoughts
function deleteUser(req, res) {
   User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
         !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => console.log(err)); // when i do a res.status(500).json(err) the server quits when the error occurs
}

// add a friend to the user's friends list
function addFriend(req, res) {
   User.findOne({ _id: req.params.fid })
      .then((friend) =>
         !friend
            ? res.status(404).json({ message: 'No user with that ID' })
            : User.findOneAndUpdate(
               { _id: req.params.id },
               { $addToSet: { friends: req.params.fid } }
            ).then((user) =>
               !user
                  ? res.status(404).json({ message: 'No user with that ID' })
                  : res.json(user)
            ).catch((err) => { res.status(500).json(err); console.log(err) })
      ).catch((err) => {
         res.status(500).json(err);
         console.log(err);
      })
}

// remove a friend from the user's friends list
function removeFriend(req, res) {
   User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: { _id: req.params.fid } } },
      { runValidators: true, new: true }
   )
      .then((user) => {
         !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
      })
      .catch((err) => {
         res.status(500).json(err);
         console.log(err);
      });
}

module.exports = {
   getUsers,
   getSingleUser,
   createUser,
   updateUser,
   deleteUser,
   addFriend,
   removeFriend,
}