const {DataTypes} = require("sequelize");
const sequelize = require('../config/db')
const bcrypt = require('bcrypt')

const Worker = sequelize.define("worker", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    firstname:{
        type:DataTypes.STRING,
        allowNull: false
    },
    lastname:{
        type:DataTypes.TEXT
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstname} ${this.lastname}`;
        },
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(value) {
            const saltRounds = 10;
            const hash = bcrypt.hashSync(value, saltRounds)
            this.setDataValue('password', hash);
          
        }
    },
    imgPath:{
      type:DataTypes.STRING,
    }
}, {
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    }
});

Worker.sync({force: true}).then(async function(res){
})

module.exports = {Worker}