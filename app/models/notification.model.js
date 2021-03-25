//this is how we use sequalizer ORM to create tables

//the two parameters passed to this module are the sequalizer library instance and the database connection/configs which 
//are passed from the index.js which you can find this directory 

module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define("notifications", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    campaign_appr_rejc: {
      type: Sequelize.BOOLEAN
    },
    campaign_start_end: {
      type: Sequelize.BOOLEAN
    },
    email: {
      type: Sequelize.STRING
    },
    payment_succ_fail: {
      type: Sequelize.BOOLEAN
    },
    user_id: {
      type: Sequelize.STRING
    }
  });

  return Notification;
};
