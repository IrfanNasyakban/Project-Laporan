import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const user = db.define('users',{
    nama: DataTypes.STRING,
    gender: DataTypes.STRING,
    tindakan: DataTypes.STRING
},{
    freezeTableName:true
})

export default user;

(async()=>{
    await db.sync();
})();