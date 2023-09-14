const Comment = require('./Comment');
const Playlist = require('./Playlist');
const Song = require('./Song');
const User = require('./User');

User.hasMany(Playlist, {
    foreignKey: 'user_id',
});

Playlist.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});


User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Playlist, {
    foreignKey: 'playlist_id'
});

Playlist.hasMany(Song, {
    foreignKey: 'playlist_id',
    onDelete: 'CASCADE'
});

Playlist.hasMany(Comment, {
    foreignKey: 'playlist_id'
});


Song.belongsTo(Playlist, {
    foreignKey: 'playlist_id'
});

module.exports = { User, Playlist, Song, Comment };
