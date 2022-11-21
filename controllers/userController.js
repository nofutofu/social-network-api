const { User, Thought } = require('../models');

module.exports = {

    getUsers(req, res) {
      User.find()
        .select('-__v')
        .then((userList) => res.json(userList))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .populate('friends')
        .select('-__v')
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

    updateUser(req, res) {
      User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { new: true }
        )
        .then((user) => 
          !user
            ? res.status(404).json({ message: 'User not found' })
            : res.json(user)
        )
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
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId }},
          { new: true }
        )
        .then((user) => 
          !user
            ? res.status(404).json({ message: 'User not found' })
            : res.json({ message: 'Friend has been added' })
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
      User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId }}
        )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'Friend not found' })
            : res.json({ message: 'Friend has been removed' })
        )
        .catch((err) => res.status(500).json(err));
    },
};