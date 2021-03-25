//this is how we use sequalizer ORM to create tables

//the two parameters passed to this module are the sequalizer library instance and the database connection/configs which 
//are passed from the index.js which you can find this directory 

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    age: { //changes starts here:wafie
      type: Sequelize.INTEGER
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.TEXT
    },
    business_name: {
      type: Sequelize.STRING
    },
    cm_client_no: {
      type: Sequelize.STRING
    },
    business_email: {
      type: Sequelize.STRING
    },
    business_contact_no: {
      type: Sequelize.STRING
    },
    business_poc: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    account_balance: {
      type: Sequelize.STRING
    } //changes ends here
  });

  return User;
};
