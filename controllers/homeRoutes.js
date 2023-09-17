const router = require('express').Router();
const withAuth = require('../utils/auth')
const { Song, User } = require('../models');

router.get('/', async (req, res) => {
    try {
    res.render('homepage')
    } catch (err) {
        res.status(500).json(err)
    }
});



router.get('/collection', async (req, res) => {
  try {
    const songs = await Song.findAll();

    const playlist = songs.map((song) => ({
      song_names: song.song_name ? song.song_name.split(', ') : [],
      song_artist: song.artist_name ? song.song_name.split(', ') : [],
    }));

    console.log(playlist);
    res.render('playlist', { playlist });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

  router.get('/collection/:id', async (req, res) => {
    try {
        const playlistData = await Song.findByPk(req.params.id);
        const playlist = playlistData.map((song) => ({
          song_names: song.song_name ? song.song_name.split(', ') : [],
          song_artist: song.artist_name ? song.song_name.split(', ') : [],
        }));
        console.log(playlist)
        res.render('playlist', {playlist})
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