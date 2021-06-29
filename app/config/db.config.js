//This is postgres credentials

//you must make sure your postgres is running on port 5432 because the postgres ORM (sequalizer) 
//uses that port by default. pleae do not attempt at changing the sequalizerpot

//if your postgres is using a different port, please set the port 
//here: "/etc/postgresql/13/main/postgresql.conf" or a similar location and restart postgres resver

module.exports = {
  HOST: "127.0.0.1",
  USER: "postgres",
  PASSWORD: "123456",
  DB: "campaign_manager",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};