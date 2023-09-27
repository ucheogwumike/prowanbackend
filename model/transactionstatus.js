module.exports = (sequelize,Sequelize)=>{
    const transactionstatus = sequelize.define("transactionstatus",{
        reference:{type:Sequelize.STRING},
        amount:{
            type: Sequelize.DECIMAL,
            allowNull: false
        },  
        title:{
            type: Sequelize.STRING
        },
        stus:{
            type: Sequelize.STRING,
        }
        
    })

    return transactionstatus;
}