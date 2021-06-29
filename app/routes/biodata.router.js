const authController = require("../controllers/auth.controller");
const bioController = require("../controllers/biodata.controller");

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
    "/biodata/infobio",
    [authController.verifyToken],
    bioController.infoBio
  );

  app.post(
    "/biodata/getbio",
    [authController.verifyToken],
    bioController.getBio
  );

  app.post(
    "/biodata/updbio",
    [authController.verifyToken],
    bioController.updBio
  );    

};
