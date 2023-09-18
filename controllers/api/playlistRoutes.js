const router = require('express').Router();
const { Song, Comment } = require('../../models');

// Route to get all songs
router.get('/', async (req, res) => {
	try {
		// Retrieve all songs from the database, ordered by date_created
		const playlistData = await Song.findAll({
			order: [['date_created']],
		});

		res.status(200).json(playlistData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Route to get a specific song by id
router.get('/:id', async (req, res) => {
	try {
		// Find the song with the specified id
		const playlistData = await Song.findByPk(req.params.id);

		// If no song is found, return an error message
		if (!playlistData) {
			res
				.status(400)
				.json({ message: 'awkard silence... playlist could not be found' });
			return;
		}

		res.status(200).json(playlistData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Route to create a new song
router.post('/', async (req, res) => {
	try {
		// Create a new song with the data from the request body and the user_id from the session
		const newSong = await Song.create({
			...req.body,
			user_id: req.session.user_id,
		});

		res.status(200).json(newSong);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Route to create a new comment for a specific song
router.post('/:id/comments', async (req, res) => {
	try {
		const { songId } = req.params;

		// Find the song with the specified id
		const song = await Song.findByPk(songId);

		// If no song is found, return an error message
		if (!song) {
			return res.status(404).json({ error: 'Playlist not found' });
		}

		// Create a new comment with the content from the request body
		const comment = await Comment.create({
			comment_text: req.body.content,
		});

		res.status(201).json(comment);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server Error' });
	}
});

// Route to delete a specific song by id
router.delete('/:id', async (req, res) => {
	try {
		// Delete the song with the specified id
		const playlistData = await Song.destroy({
			where: {
				id: req.params.id,
			},
		});

		res.status(200).json(playlistData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
