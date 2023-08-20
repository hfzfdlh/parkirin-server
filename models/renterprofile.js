'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RenterProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RenterProfile.belongsTo(models.Renter)
    }
  }
  RenterProfile.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Name is not null'
        },
        notEmpty:{
          msg:'Name is not empty'
        }
      }
    },
    phoneNumber: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Phone Number is not null'
        },
        notEmpty:{
          msg:'Phone Number is not empty'
        }
      }
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Address is not null'
        },
        notEmpty:{
          msg:'Address is not empty'
        }
      }
    },
    money: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Money is not null'
        },
        notEmpty:{
          msg:'Money is not empty'
        },
        isNumeric:{
          msg:'Money input is not Number'
        },min:{
          args:[0],
          msg:'Money input must be above 0'
        }
      }
    },
    photoUrl: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Photo is not null'
        },
        notEmpty:{
          msg:'Photo is not empty'
        }
      }
    },
    RenterId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:' Renter ID is not null'
        },
        notEmpty:{
          msg:'Renter Id is not empty'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate:(renter)=>{
        if(!renter.money) renter.money = 0
      }
    },
    sequelize,
    modelName: 'RenterProfile',
  });
  return RenterProfile;
};