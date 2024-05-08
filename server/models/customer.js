"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Selling, {
        foreignKey: "CustomerId",
      });
    }
  }
  Customer.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      date_of_birth: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
