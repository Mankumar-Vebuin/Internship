import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbOrm.ts";

const Contact = sequelize.define(
  "Contact",
  {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_id: DataTypes.NUMBER,
  },
  {
    tableName: "contacts",
    timestamps: false,
  }
);

export { Contact };
