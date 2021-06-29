//this is how we use sequalizer ORM to create tables

//the two parameters passed to this module are the sequalizer library instance and the database connection/configs which 
//are passed from the index.js which you can find this directory 

module.exports = (sequelize, Sequelize) => {
  const Support = sequelize.define("support", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING
    },
    tel1: {
      type: Sequelize.STRING
    },
    tel2: {
      type: Sequelize.STRING
    }
  });

  return Support;
};
