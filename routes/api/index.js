// imports the routes as well as the express router
const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// assigns the thoughtRoutes router to the /thoughts url and users to /users in the api route.
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;