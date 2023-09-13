const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],

            },
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                $.ajax({
                    url: "https://api.spotify.com/v1/me",
                    headers: {
                      Authorization: "Bearer " + accessToken,
                    },
                    success: function (response) {
                      // Do something with userdata
                      newUserData.name = response.display_name;
                      newUserData.email = response.email;
                      newUserData.id = response.id;
                    }});
                    return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        underscored:true,
        modelName: 'user'
    }
);

module.exports = User;