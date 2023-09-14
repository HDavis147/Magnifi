const User = require('./User');
const Song = require('./Song');
const Comment = require('./Comment');

User.hasMany(Song, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Song.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});



module.exports = { User, Song, Comment };
