const { Thought, User } = require('../models');

module.exports = {

    getThoughts(req, res) {
      Thought.find()
      .select('-__v')
        .then((thoughtList) => res.json(thoughtList))
        .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'Thought not found'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => {
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id }},
            { new: true, }
          )
        })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'Thought created but user was not found' })
            : res.json({ message: 'Thought has been created' })
        )
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        )
      .then((thought) => 
        !thought 
          ? res.status(404).json({ message: 'Thought not found' })
          : res.json({ message: 'Thought has been updated' })
      )
      .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'Thought not found' })
            : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId }},
              { new: true }
            )
        )
        .then((user) => 
          !user
            ? res.status(404).json({ message: 'Thought deleted but user was not found '})
            : res.json({ message: 'Thought has been deleted'})
            )
        .catch((err) => res.status(500).json(err));
    },

    addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body }},
        { new: true }
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Thought not found to add reaction'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.body }},
        )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'Thought not found to remove reaction'})
            : res.json({ message: 'Reaction has been remove' })
        )
        .catch((err) => res.status(500).json(err));
    },
};