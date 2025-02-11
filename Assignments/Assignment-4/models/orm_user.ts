const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Orm_User = sequelize.define(
  "Orm_User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Orm_User",
    tableName: "orm_user"
  }
);

Orm_User.sync({force: true})

console.log(Orm_User === sequelize.models.Orm_User);
