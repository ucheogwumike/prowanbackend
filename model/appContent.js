module.exports = (sequelize,Sequelize)=>{
    const User = sequelize.define("user",{
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
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        middleName:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        title:{
            type: Sequelize.STRING
        },
        status:{
            type: Sequelize.STRING,
            allowNull: false
        },
        phone:{
            type: Sequelize.STRING,
            allowNull: false
        },
        membershipNumber:{
            type: Sequelize.STRING,
            allowNull: false
        },
        dateOfBirth:{
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        residentialAddress:{
            type: Sequelize.TEXT,
            allowNull: false
        },
        nationality:{
            type: Sequelize.STRING,
            allowNull: false
        },
        stateOfOrigin:{
            type: Sequelize.STRING,
            allowNull: false
        },
        branch:{
            type: Sequelize.STRING,
            allowNull: false
        },
        presentEmployer:{
            type: Sequelize.STRING
        },
        memberOfManagementBoard:{
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        positionHeld:{
            type: Sequelize.STRING
        },
        profilePicture:{
            type: Sequelize.STRING
        }

        
    })

    return Users;
}