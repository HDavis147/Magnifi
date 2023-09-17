const router = require('express').Router();
const withAuth = require('../utils/auth')
const { Song, User } = require('../models');
router.get('/', withAuth, async (req, res) => {
    try {
    res.render('homepage', {
      logged_in: req.session.logged_in
    })
    } catch (err) {
        res.status(500).json(err)
    }
});
router.get('/collection', withAuth, async (req, res) => {
  try {
    const songs = await Song.findAll();
    const playlist = songs.map((song) => ({
      song_name: song.song_name ? song.song_name.split(', ') : [],
      song_artist: song.artist_name ? song.song_name.split(', ') : [],
    }));
    console.log(playlist);
    res.render('playlist', { playlist });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
  router.get('/collection/:id', withAuth, async (req, res) => {
    try {
      const playlistData = await Song.findByPk(req.params.id, {
        include: {
          model: User,
          attributes: [
            'id',
            'name',
            'email'
          ]
        }
      });
      const playlist = {
        id: playlistData.id,
        date_created: playlistData.date_created,
        song_name: playlistData.song_name ? playlistData.song_name.split(', ') : [],
        song_artist: playlistData.artist_name ? playlistData.artist_name.split(', ') : [],
        user_id: req.session.user_id
      }
        console.log(playlist)
        res.render('playlist', { playlist })
    } catch (err) {
        res.status(500).json(err)
    }
  });
    
router.get('/userlogin', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/')
        return;
    }
    res.render('login')
})
// router.get('/:id', async (req, res) => {
    
// });
module.exports = router;