const authController = require("../controllers/auth.controller");
const moderatorController = require("../controllers/moderator.controller");

module.exports = function(app) {   
  
  app.use(function(req, res, next) {
    //allowing headers for CORS (Cross-origin resource sharing). 

    //this is to allow frontend and backend to communicate with eachother.

    //this is literally the first thing we check before we call "next()" method on express 
    //and continue with the rest of the routing checks.

    //SUPER IMPORTANT

    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/moderator/home",
    [authController.verifyToken, authController.isModerator],
    moderatorController.moderatorHome
  );

  app.get(
    "/moderator/profile",
    [authController.verifyToken, authController.isModerator],
    moderatorController.moderatorProfile
  );  

};
