import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const Loket = db.define(
  "loket",
  {
    nomer_loket: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.TINYINT(1),
    },
  },
  {
    freezeTableName: true,
  }
);

export default Loket;
