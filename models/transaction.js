'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User)
      Transaction.belongsTo(models.Renter)
    }
  }
  Transaction.init({
    UserId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:'User ID is not Null'
        },
        notEmpty:{
          msg:'User ID is not empty'
        }
      }
    },
    RenterId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Renter ID is not Null'
        },
        notEmpty:{
          msg:'Renter ID is not empty'
        }
      }
    },
    paid: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Paid money is not Null'
        },
        notEmpty:{
          msg:'Paid money is not empty'
        }
      }
    },
    status: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:'Status is not Null'
        },
        notEmpty:{
          msg:'Status is not empty'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate:(trans)=>{
        trans.status='Active'
      }
    },
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};