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
    const songs = await Song.findAll({
      include: {
        model: User,
        attributes: ['id', 'name', 'email']
      }
    });
    const playlist = songs.map((song) => ({
      ...song.get({ plain: true }),
      song_name: song.song_name ? song.song_name.split(', ') : [],
      song_artist: song.artist_name ? song.artist_name.split(', ') : []
    }));
    console.log(playlist);
    res.render('collection', { playlist });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})
router.get('/collection/:id', withAuth, async (req, res) => {
  try {
    const songData = await Song.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['id', 'name', 'email']
      }
    });
    
    const playlistData = {
      ...songData.get({ plain: true }),
      song_name: songData.song_name ? songData.song_name.split(', ') : [],
      song_artist: songData.artist_name ? songData.artist_name.split(', ') : []
    };
    console.log(playlistData)
    res.render('playlist', { playlistData });
  } catch (err) {
    res.status(500).json(err);
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