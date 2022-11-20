const router = require('express').Router();
const { getThoughts, getSingleThought, createThought } = require('../../controllers/thoughtController');

router.route('/').get(getThoughts);

router.route('/').post(createThought);

router.route('/:_id').get(getSingleThought);

router.route('/:_id').put(updateThought);

router.route('/:_id').delete(deleteThought);

module.exports = router;