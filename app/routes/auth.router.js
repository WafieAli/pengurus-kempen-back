const authController = require("../controllers/auth.controller");

// Allowing headers for CORS
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //will attempt to delete expired tokens
  app.get(
    "/auth/clear", authController.clearToken
    );

  app.post(
    "/auth/register",
    [
      authController.checkDuplicateUsernameOrEmail, // check if the email elready exists ot not
      authController.checkRolesExisted // check if the role already exists or not
    ],
    authController.register // if the two checks above are successful, then process with the user registeration
  );

  app.post(
    "/auth/login", 
    authController.login
    ); // if everything above is successful, then send the user to login page
};
