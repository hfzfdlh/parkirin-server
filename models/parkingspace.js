'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParkingSpace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ParkingSpace.belongsTo(models.Renter)
    }
  }
  ParkingSpace.init({
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
    lat: {
      type:DataTypes.FLOAT,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Latitude is not null'
        },
        notEmpty:{
          msg:'Latitude is not empty'
        }
      }
    },
    lng: {
      type:DataTypes.FLOAT,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Latitude is not null'
        },
        notEmpty:{
          msg:'Latitude is not empty'
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
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Price is not null'
        },
        notEmpty:{
          msg:'Price is not empty'
        },
        min:{
          args:[0],
          msg:'Minimum price is 0'
        }
      }
    },
    RenterId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Renter ID is not null'
        },
        notEmpty:{
          msg:'Renter ID is not empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ParkingSpace',
  });
  return ParkingSpace;
};