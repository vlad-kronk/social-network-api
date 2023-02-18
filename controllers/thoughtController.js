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

// update a thought
// req'd body:
// {
//    thoughtText: str
// }
function updateThought(req, res) {
   Thought.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((thought) => {
         !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({ message: 'Thought updated.' });
      })
      .catch((err) => res.status(500).json(err));
}

// delete a thought
function deleteThought(req, res) {
   Thought.findOneAndDelete({ _id: req.params.id })
      .then((thought) => {
         !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({ message: 'Thought deleted.' });
         User.findOneAndUpdate(
            { username: thought.username },
            { $pull: { thoughts: thought._id } }
         )
            .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err))
}

// add a reaction
// req'd body:
// {
//    reactionBody: str
//    username: str
// }
function addReaction(req, res) {
   Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { reactions: req.body } }
   )
      .then((thought) =>
         !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
      )
      .catch((err) => res.status(500).json(err))
}

// remove a reaction
function removeReaction(req, res) {
   console.log(req.params)
   Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: { reactionId: req.params.rid } } },
      { new: true }
   )
      .then((thought) => {
         console.log(thought);
         !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({ message: 'Reaction removed.' })

      })
      .catch((err) => res.status(500).json(err))
}

module.exports = {
   getThoughts,
   getSingleThought,
   createThought,
   updateThought,
   deleteThought,
   addReaction,
   removeReaction
}