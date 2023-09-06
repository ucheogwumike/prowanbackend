const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('prowan','prowan','prowan123',{
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

module.exports = db;