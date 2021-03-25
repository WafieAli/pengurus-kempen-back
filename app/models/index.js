//fetching database connection info
const config = require("../config/db.config.js");

//fetching the sequelizer library
const Sequelize = require("sequelize");

//creating sequelizer ORM object using the database config in the /config/db.config.js
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    logging: false, // if set to "console.log()" will log the sequelizer operations

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

//creating a json object called "db" to hold the database info
const db = {};

//adding our sequelizer database object to "db" object
db.sequelize = sequelize;

//adding sequelizer library instance to "db" object
db.Sequelize = Sequelize;

//creating the database module object and adding them to the "db" object.
//we are passing two parameters to each module. the sequelizer database object and the sequelizer library object 
db.user_table = require("../models/user.model.js")(sequelize, Sequelize);
db.noti_table = require("../models/notification.model.js")(sequelize, Sequelize);
db.payment_table = require("../models/payment.model.js")(sequelize, Sequelize);
db.noti_log_table = require("../models/notification.log.model.js")(sequelize, Sequelize);
db.support_table = require("../models/support.model.js")(sequelize, Sequelize);
db.paylog_table = require("../models/paylog.model.js")(sequelize, Sequelize);

//adding an array of roles to use in user registration
db.Allowed_ROLES = ["user", "admin", "moderator"];

module.exports = db;
