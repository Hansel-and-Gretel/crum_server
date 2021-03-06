module.exports = (sequelize, Sequelize) => {
    const Places = sequelize.define(
      "places",
      {
        placeName: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        pinTime: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        longitude: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        latitude: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING(200),
        },
        note: {
          type: Sequelize.STRING(255),
        },
        category: {
          type: Sequelize.STRING(50),
        },
        status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        journeysId:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'journeys',//table name 
            key: 'id',//table column
         }
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',//table name 
            key: 'id',//table column
         }
        },
        userName: {
          type: Sequelize.STRING(50),
          allowNull: false,
          references: {
            model: 'users',//table name 
            key: 'userName',//table column
         }
        }
      },
      {
        id: true,
        timestamps: true,
      }
    );
    
    return Places;
  };