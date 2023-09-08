const router = require('express').Router();
const { Playlist, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const playlistData = await Playlist.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        collection = playlistData.map((playlist) => (playlist).get({ plain: true }));

        res.render('homepage', {
            collection,
            logged_in: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', async (req, res) => {

});

router.get('/collection/:id', async (req, res) => {

});

