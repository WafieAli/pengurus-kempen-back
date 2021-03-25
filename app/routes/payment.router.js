const authController = require("../controllers/auth.controller");
const payController = require("../controllers/payment.controller");

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

  app.post(
    "/payment/getpay",
    [authController.verifyToken],
    payController.getPay
  );

  app.post(
    "/payment/updpay",
    [authController.verifyToken],
    payController.updPay
  ); 
  
  app.post(
    "/payment/getlogs",
    [authController.verifyToken],
    payController.getPayLogs
  );

};
