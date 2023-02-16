const { User, Thought } = require('../models');

// get all thoughts
function getThoughts(req, res) {
   Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
}

// get a single thought
function getSingleThought(req, res) {
   Thought.findOne(
      { _id: req.params.id }
   ).then((thought) =>
      !thought
         ? res.status(404).json({ message: 'No thought with that ID' })
         : res.json(thought)
   ).catch((err) => res.status(500).json(err));
}

// post a thought
function createThought(req, res) {
   Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username
   })
      .then((thought) => {
         User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } }
         )
            .catch((err) => res.status(500).json(err));
      })
      .then(() => res.json({ message: 'Thought added!' }))
      .catch((err) => res.status(500).json(err));
}

module.exports = {
   getThoughts,
   getSingleThought,
   createThought,
}