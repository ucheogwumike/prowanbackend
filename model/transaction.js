module.exports = (sequelize,Sequelize)=>{
    const transaction = sequelize.define("user",{
        trxid:{
            type: Sequelize.UUID,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        amount:{
            type: Sequelize.DECIMAL,
            allowNull: false
        },  
        title:{
            type: Sequelize.STRING
        },
        
    })

    return transaction;
}