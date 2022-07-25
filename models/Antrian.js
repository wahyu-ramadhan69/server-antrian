import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

const Antrian = db.define(
  "antrian",
  {
    id_user: {
      type: DataTypes.STRING,
    },
    nomer: {
      type: DataTypes.STRING,
    },
    loket: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    freezeTableName: true,
  }
);

Antrian.belongsTo(Users, { targetKey: "id", foreignKey: "id_user" });

export default Antrian;
