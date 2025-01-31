import { Sequelize }  from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

const DBConnection = async() => {
    try {
        await sequelize.authenticate();
        console.log('Database Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

export {DBConnection , sequelize}