module.exports = (sequelize,Sequelize)=>{
    const ref = sequelize.define("ref",{
        message:{
            type: Sequelize.UUID,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        reference:{
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        
        
        

        
    })

    return ref;
}