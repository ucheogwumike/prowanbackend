const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();


const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
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
db.transactions = require("./transaction")(sequelize,Sequelize);
//db.refs = require("./ref")(sequelize,Sequelize);
db.transactionStatus = require("./transactionstatus")(sequelize,Sequelize);
db.token = require('./token')(sequelize,Sequelize);

db.users.hasMany(db.transactions,{as:"transaction"});
db.transactions.belongsTo(db.users,{
    foreignKey:"userId",
    as:"user"
})


db.users.hasMany(db.transactionStatus,{as:"transactionstatus"});
db.transactionStatus.belongsTo(db.users,{
    foreignKey:"userId",
    as:"user"
})
module.exports = db;