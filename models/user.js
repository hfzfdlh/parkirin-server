'use strict';

const {
  Model
} = require('sequelize');
const { createPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile)
      User.hasMany(models.Transaction)
    }
  }
  User.init({
    email:{ 
      type:DataTypes.STRING,
      unique:{
        msg:'Email has been registered'
      },
      allowNull:false,
      validate:{
        notNull:{
          msg:'Email cannot be Null'
        },
        notEmpty:{
          msg:'Email cannot be Empty'
        },
        isEmail:{
          msg:'Input must be Email'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Password cannot be null'
        },
        notEmpty:{
          msg:'Password cannot be empty'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate:(user) =>{
        user.password = createPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};