const router = require('express').Router();
// imports the methods from the userControllers
const { getUsers, getSingleUser, createUser, deleteUser, addFriend, deleteFriend, updateUser } = require('../../controllers/userController');

// routes to get a list of all users or create a user to add one to the list
router.route('/').get(getUsers).post(createUser);

// routes manipulate a specific user by ID .. to either find one, delete one, or update one
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// routes to manipulate a specific user's friends .. adding a friend or deleting a friend from the array
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;