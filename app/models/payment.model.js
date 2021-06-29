//this is how we use sequalizer ORM to create tables

//the two parameters passed to this module are the sequalizer library instance and the database connection/configs which 
//are passed from the index.js which you can find this directory 

module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("payments", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    payment_method: {
      type: Sequelize.STRING
    },
    bank_name: {
      type: Sequelize.STRING
    },
    creditcard_no: {
      type: Sequelize.INTEGER
    }
  });

  return Payment;
};
