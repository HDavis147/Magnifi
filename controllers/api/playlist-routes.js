const router = require('express').Router();
const { Playlist, Song, Comment } = require('../../models');
const { getSongs } = require('../../utils/data')

router.get('/', async (req, res) => {
    try {
        const playlistData = await Playlist.findAll({
            order: [['date_created']],
        });
        res.status(200).json(playlistData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const playlistData = await Playlist.findByPk(req.params.id)

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
    try {
        const songs = await getSongs();
        const playlistData = await Playlist.create(req.body);
        res.status(200).json(playlistData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/:id/comments', async (req, res) => {
    try {
        const { playlistId } = req.params;
    
        const playlist = await Playlist.findByPk(playlistId);
    
        if (!playlist) {
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