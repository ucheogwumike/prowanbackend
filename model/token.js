module.exports = (sequelize,Sequelize)=>{
    const token = sequelize.define("token",{
        token: {
            type: Sequelize.STRING,
            allowNull: false,
            trim: true,
            index: true,
          },
          user: {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
    })

    return token;
}