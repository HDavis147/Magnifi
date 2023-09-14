const router = require('express').Router();
const { Playlist, User } = require('../models');

router.get('/', async (req, res) => {
    res.render('homepage')
    // try {
    //     const playlistData = await Playlist.findAll({
    //         include: [
    //             {
    //                 model: User,
    //                 attributes: ['name']
    //             }
    //         ]
    //     });

    //     collection = playlistData.map((playlist) => (playlist).get({ plain: true }));

    //     res.render('homepage', {
    //         collection,
    //         logged_in: req.session.logged_in
    //     });
    // } catch (err) {
    //     res.status(500).json(err)
    // }
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