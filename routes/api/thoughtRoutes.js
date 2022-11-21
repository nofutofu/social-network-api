const router = require('express').Router();
// imports the methods from the thought controller
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtController');

// routes to get a list of all thoughts or create a thought and add it to the list
router.route('/').get(getThoughts).post(createThought);

// routes to manipulate a specific thought by ID .. get a single thought, update a single thought, or delete a thought.
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// routes to manipulate a single thought's reactions .. add a reaction message or delete a reaction message
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;