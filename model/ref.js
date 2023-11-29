module.exports = (sequelize,Sequelize)=>{
    const ref = sequelize.define("ref",{
        amount:{
            type: Sequelize.DECIMAL,
            allowNull: false,
          
        },
        reference:{
            type: Sequelize.STRING,
            allowNull: false
        },
        
        
        

        
    })

    return ref;
}
