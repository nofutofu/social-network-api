const { Thought, User } = require('../models');

module.exports = {

  // returns a list of all thoughts in the DB
    getThoughts(req, res) {
      Thought.find()
      .select('-__v')
        .then((thoughtList) => res.json(thoughtList))
        .catch((err) => res.status(500).json(err));
    },

    // returns a single thought based on requested thoughtId
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) => 
        !thought
        // if there is no thought display error message otherwise return the thought
          ? res.status(404).json({ message: 'Thought not found'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },

    // creates a new thought and adds it to the list of thoughts
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => {
          // when a new thought is created update the specified user 
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            // adds the new thought to the user's thought list using the $addToSet operator
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

    // updates a user's specified thought
    updateThought(req, res) {
      // finds and updates a thought
      Thought.findOneAndUpdate(
        // speicifes the thought through the thoughtId
        { _id: req.params.thoughtId },
        // uses the $set operator to replace the previous body items with the new ones
        { $set: req.body },
        )
      .then((thought) => 
        !thought 
          ? res.status(404).json({ message: 'Thought not found' })
          : res.json({ message: 'Thought has been updated' })
      )
      .catch((err) => res.status(500).json(err));
    },

    // deletes a thought from the thought list based on the requested thoughtId
    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'Thought not found' })
            // finds the specified user and updates the thought listed in their user
            : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              // removes the thought from the user's thoughts list using the $pull operator
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

    // adds a reaction to the specified thought's reaction list
    addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        // adds the reaction body to the reaction set list
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

    // deletes a reaction from the specified thought's reaction list
    deleteReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        // removes a reaction from the thought using the $pull oeprator 
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