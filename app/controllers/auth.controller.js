const db = require("../models");
const config = require("../config/auth.config");
const User = db.user_table;//user model
const allowedRoles = db.Allowed_ROLES;//[user, moderator, admin]
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { request } = require("express");

exports.clearToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if(err){ //token is invalid
          return res.status(200).send({
            message: "ok"
          });
      }else{ //token still valid
        return res.status(200).send({
          message: ""
        });
      }
    }); 
  }else{
    return;
  }
};

exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if(!token){
    token = req.body.request_body["x-access-token"];
  }
  
  if (!token) {
    return res.status(403).send({
      message: "No token provided!!!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

exports.isUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
      if (user.role === "user") {
        next();
        return;
      }
      res.status(403).send({
        message: "Require User Role!"
      });
  });
};

exports.isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
      if (user.role === "moderator") {
        next();
        return;
      }
      res.status(403).send({
        message: "Require Moderator Role!"
      });
  });
};

exports.isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
      if (user.role === "admin") {
        next();
        return;
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
  });
};


exports.checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

exports.checkRolesExisted = (req, res, next) => {
  if (req.body.role) {
    if (! allowedRoles.includes(req.body.role)) {
      res.status(400).send({
        message: "Failed! Role does not exist"
      });
      return;
    }
  }
  
  next();
};

exports.register = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8)
  }).then(()=>{
        res.send({ message: "User registered successfully!"}
        );}
      ).catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // defining how long the JWT token will remain valid for in seconds
      });

      res.status(200).send(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          accessToken: token,
          balance: user.account_balance
        }
      );
    
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
