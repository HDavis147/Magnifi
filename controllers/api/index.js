const router = require('express').Router();
const playlistRoutes = require('./playlistRoutes');
const userRoutes = require('./userRoutes');
// creating the root routes for after the /api that include the routes created
router.use('/playlist', playlistRoutes);
router.use('/user', userRoutes);

module.exports = router;
