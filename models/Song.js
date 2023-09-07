const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Song extends Model {};

Song.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        artist_name: {
            type: DataTypes.STRING,
        },
        song_image: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        playlist_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'playlist',
                key: 'id'
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'song'
    }
);

module.exports = Song;