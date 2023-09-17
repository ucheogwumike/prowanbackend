module.exports = (sequelize,Sequelize)=>{
    const transaction = sequelize.define("transaction",{
        reference:{type:Sequelize.STRING},
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