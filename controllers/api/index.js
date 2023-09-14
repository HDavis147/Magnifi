const router = require('express').Router()
const playlistRoutes = require('./playlist-routes');

router.use('/playlist', playlistRoutes);




module.exports = router