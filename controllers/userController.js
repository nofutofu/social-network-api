const { User, Thought } = require('../models');

module.exports = {

    getUsers(req, res) {
      User.find()
        .then((userList) => res.json(userList))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('__v')
        .populate('friends')
        .then((user) => 
            !user  
               ? res.status(404).json({ message: 'User not found' })
               : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) => 
            !user
              ? res.status(404).json ({ message: 'User not found' })
              : Thought.deleteMany({ _id: { $in: user.thoughts }})
          )
          .then(() => res.json({ message: `User and user's thoughts have been deleted` }))
          .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
      User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { friends: friend._id } },
          { new: true })
        .then((user) => 
          !user
            ? res.status(404).json({ message: 'User not found' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
      User.findOneAndUpdate(
          { _id: req.body.userId },
          { $pull: { friends: friend._id } })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'Friend not found' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};