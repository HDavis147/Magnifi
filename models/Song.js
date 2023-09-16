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
        date_created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        song_name: {
            type: DataTypes.STRING,
        },
        artist_name: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        modelName: 'song'
    }
);

module.exports = Song;