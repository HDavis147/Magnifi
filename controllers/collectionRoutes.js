const router = require('express').Router();
const { Song, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    // I want it get the users playlist saved in our db
    // I want it to also ask at the bottom if they want to get a new listen result
    try {
        const playlistData = await Song.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        const playlists = playlistData.map((playlist) => playlist.get({ plain: true }));

        res.render('browse', {
            playlists,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    // I want to create the new listen history to this route
    try {
        const playlistData = await Song.bulkCreate({
            song_name: req.body,
            artist_name: req.body,
        })

        const playlist = playlistData.map((song) => song.get({ plain: true }))
        res.render('playlist', {
            playlist,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }

});

router.put('/:id', async (req, res) => {
    // I want to edit the listen history i have already gotten to update it to what it is currently for the same month
});

router.get('/:id', async (req, res) => {
    // I want it to be the specific playlist in our magazine style layout with the comments appearing to the right and the playlist on the left

});

module.exports = router;