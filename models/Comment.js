const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {};

Model.init(
    {
       id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
       },
       comment_text: {
        type: DataTypes.STRING,
        allowNull: false
       },
       user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        },
       },
       playlist_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'playlist',
            key: 'id'
        },
       },
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;