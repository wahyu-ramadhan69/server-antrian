import {Sequelize} from "sequelize";

const db = new Sequelize('antrian','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;