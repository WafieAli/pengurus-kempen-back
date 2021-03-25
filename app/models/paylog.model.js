//this is how we use sequalizer ORM to create tables

//the two parameters passed to this module are the sequalizer library instance and the database connection/configs which 
//are passed from the index.js which you can find this directory 

module.exports = (sequelize, Sequelize) => {
  const PayLog = sequelize.define("payment_logs", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    amount: {
      type: Sequelize.STRING
    },
    remarks: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.STRING
    }
  });

  return PayLog;
};
