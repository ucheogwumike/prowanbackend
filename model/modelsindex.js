const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('prowan','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

    
sequelize.authenticate().then(()=>{
    console.log('connection successful')
}).catch(()=>{
    console.log('connection successful')
});



const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users")(sequelize,Sequelize);

module.exports = db;