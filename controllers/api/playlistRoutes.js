const router = require('express').Router();
const { Song, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const playlistData = await Song.findAll({
            order: [['date_created']],
        });
        res.status(200).json(playlistData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const playlistData = await Song.findByPk(req.params.id)

        if(!playlistData) {
            res.status(400).json({ message: 'awkard silence... playlist could not be found' })
            return;
        }
        res.status(200).json(playlistData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', async (req, res) => {
    console.log(req)
    try {
        const playlistData = await Song.bulkCreate([
            {
                song_name: req.body,
                artist_name: req.body
            }
        ]);
        res.status(200).json(playlistData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/:id/comments', async (req, res) => {
    try {
        const { songId } = req.params;
    
        const song = await Song.findByPk(songId);
    
        if (!song) {
          return res.status(404).json({ error: 'Playlist not found' });
        }
    
        const comment = await Comment.create({
          comment_text: req.body.content,
        });
    
        res.status(201).json(comment);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
      }
    });

module.exports = router;