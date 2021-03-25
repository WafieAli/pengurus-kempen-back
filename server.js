const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  //listening to the communications from the frontend which are coming on port 8081
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions)); // CORS Cross Origin Resourse Sharing is how we bind the app to frontend

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//loading all the database modules
const db = require("./app/models");

//MODE=FirstRun node server.js
//Setting up the tables for the first time we are running the project. This drop the tables if they exist.
if(process.env.MODE == "FirstRun")
{
  // force: true will drop the table if it already exists
  db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  }).catch(err => {
    console.error('Error: ', err);
  });
}

//Created by Wafie: MODE=ReSync
//This creates the table if it doesn't exist (and does nothing if it already exists)
if(process.env.MODE == "ReSync")
{
  // resync database and create new tables if doesn't exist
  db.sequelize.sync().then(() => {
    console.log('Resync Database');
    }).catch(err => {
      console.error('Error: ', err);
    });
}

//Created by Wafie: MODE=Alter
//This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
if(process.env.MODE == "Alter")
{
  // resync database and create new tables if doesn't exist
  db.sequelize.sync({ alter: true }).then(() => {
    console.log('Alter Database');
    }).catch(err => {
      console.error('Error: ', err);
    });
}



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend API" });
});

// routes
require('./app/routes/auth.router.js')(app);
require('./app/routes/public.router.js')(app);
require('./app/routes/user.router.js')(app);
require('./app/routes/moderator.router.js')(app);
require('./app/routes/admin.router.js')(app);
require('./app/routes/biodata.router.js')(app);
require('./app/routes/account.router.js')(app);
require('./app/routes/notification.router.js')(app);
require('./app/routes/payment.router.js')(app);
require('./app/routes/support.router.js')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

