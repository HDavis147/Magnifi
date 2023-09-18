const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Song, User } = require('../models');

// Route to render the homepage
router.get('/', withAuth, async (req, res) => {
	try {
		res.render('homepage', {
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Route to render the collection page
router.get('/collection', withAuth, async (req, res) => {
	try {
		// Retrieve all songs from the database, including associated user data
		const songs = await Song.findAll({
			include: {
				model: User,
				attributes: ['id', 'name', 'email'],
			},
		});

		// Format the songs data and split song names and artist names into arrays
		const playlist = songs.map((song) => ({
			...song.get({ plain: true }),
			song_name: song.song_name ? song.song_name.split(', ') : [],
			song_artist: song.artist_name ? song.artist_name.split(', ') : [],
		}));
		// this is rendering the Handlbars template of collection and using the playlist object created
		res.render('collection', { playlist });
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});

// Route to render the playlist page for a specific song
router.get('/collection/:id', withAuth, async (req, res) => {
	try {
		// Retrieve the song data for the specified id, including associated user data
		const songData = await Song.findByPk(req.params.id, {
			include: {
				model: User,
				attributes: ['id', 'name', 'email'],
			},
		});

		// Format the song data and split song names and artist names into arrays
		const playlistData = {
			...songData.get({ plain: true }),
			song_name: songData.song_name ? songData.song_name.split(', ') : [],
			song_artist: songData.artist_name ? songData.artist_name.split(', ') : [],
		};

		res.render('playlist', { playlistData });
	} catch (err) {
		res.status(500).json(err);
	}
});

// Route to render the login page
router.get('/userlogin', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/');
		return;
	}
	res.render('login');
});

module.exports = router;
