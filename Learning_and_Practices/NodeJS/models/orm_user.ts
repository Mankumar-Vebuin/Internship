import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbOrm.ts";

const Orm_User = sequelize.define(
  "Orm_User",
  {
    id: DataTypes.NUMBER,
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "Orm_User",
    tableName: "orm_user",
  }
);


export { Orm_User };
