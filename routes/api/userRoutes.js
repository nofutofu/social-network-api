const router = require('express').Router();
const { getUsers, getSingleUser, createUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userController');

router.route('/').get(getUsers);

router.route('/').post(createUser);

router.route('/:_id').get(getSingleUser);

router.route('/:_id').delete(deleteUser)

router.route('/:_id/friends/:friendId').post(addFriend);

router.route('/:_id/friends/:friendId').delete(deleteFriend);

module.exports = router;