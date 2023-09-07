const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Playlist extends Model {};

Playlist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        month: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
        song_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'song',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'playlist'
    }
);

module.exports = Playlist;