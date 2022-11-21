// imports all api routes & express router
const router = require('express').Router();
const apiRoutes = require('./api');

// sets the url route for all api routes to begin with /api
router.use('/api', apiRoutes);

// 404 route incase a route not specified is entered
router.use((req, res) => {
    return res.send('Bad Route.');
});

module.exports = router;