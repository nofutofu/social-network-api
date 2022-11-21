const { User, Thought } = require('../models');

module.exports = {

  // returns a list of all users
    getUsers(req, res) {
      User.find()
      // gets rid of the -__v item
        .select('-__v')
        .then((userList) => res.json(userList))
        // error catching incase unknown error occurs
        .catch((err) => res.status(500).json(err));
    },

    // returns a single user based on the searched userId 
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
      // populates the friends item so they are visible on search
        .populate('friends')
        .select('-__v')
        .then((user) => 
        // if a user is not found return a 404 error, otherwise return the user
            !user  
               ? res.status(404).json({ message: 'User not found' })
               : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // creates a user and adds it to the list of users 
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // updates the information in a single specified user and returns the resulted changes
    updateUser(req, res) {
      User.findOneAndUpdate(
        // specifies the user with the request userId
          { _id: req.params.userId },
          // uses the mongoose $set operator to replace the previous body items with the new one 
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

    // deletes a user from the user list based on the requested userId
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) => 
            !user
            // if a user is not found return an error message
              ? res.status(404).json ({ message: 'User not found' })
            // when a user is deleted it deletes all thoughts associated with it
              : Thought.deleteMany({ _id: { $in: user.thoughts }})
          )
          .then(() => res.json({ message: `User and user's thoughts have been deleted` }))
          .catch((err) => res.status(500).json(err));
    },

    // adds a friend to the specified user's friendlist 
    addFriend(req, res) {
      User.findOneAndUpdate(
          { _id: req.params.userId },
          // adds the new friend to the friends set using the $addToSet operator by using the requested friendId
          { $addToSet: { friends: req.params.friendId }},
          { new: true }
        )
        .then((user) => 
          !user
          // if user is found adds the friend to the list otherwise specifiy the user was not found
            ? res.status(404).json({ message: 'User not found' })
            : res.json({ message: 'Friend has been added' })
        )
        .catch((err) => res.status(500).json(err));
    },

    // deletes a friend from the specified user's friendlist
    deleteFriend(req, res) {
      User.findOneAndUpdate(
          { _id: req.params.userId },
          // pulls a friend from the user's friendlist using the $pull operator by using the requested friendId
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