const router = require('express').Router()
const playlistRoutes = require('./playlistRoutes');
const userRoutes = require('./userRoutes')

router.use('/playlist', playlistRoutes);
router.use('/user', userRoutes);




module.exports = router