const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

//creating the routes used for the root route and also the /api route
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;
