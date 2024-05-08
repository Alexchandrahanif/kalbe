"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Selling extends Model {
    static associate(models) {
      Selling.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      Selling.belongsTo(models.Product, {
        foreignKey: "ProductId",
      });
      Selling.belongsTo(models.Customer, {
        foreignKey: "CustomerId",
      });
    }
  }
  Selling.init(
    {
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      CustomerId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Selling",
    }
  );
  return Selling;
};
