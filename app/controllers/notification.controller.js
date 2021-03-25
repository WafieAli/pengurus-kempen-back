const db = require("../models");
const Notification = db.noti_table;//notification model
const NotificationLog = db.noti_log_table;//notification_log model
const { request } = require("express");

exports.getNotiSet = (req, res, next) => {
  const userid = req.body.request_body.user.id.toString();
  Notification.findAll({where: { user_id: userid }}).then(data => {
    if (!data) {
      return res.status(404).send({ message: "Data Not found." });
    } else{
      res.status(200).send({ 
        message: data[0]
      });
     }
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: err.message });
  });
};

exports.updNotiSet = (req, res) => {
  const userid = req.body.request_body.user.id
  const username = req.body.request_body.user.username
  Notification.update(req.body.request_body.data, {where: {user_id: userid}}).then(num => { //update notifications and respond to views.
    if (num == 1) {
      res.send({
        message: "Update notifications setup successful."
      });
    } else {
      Notification.create(req.body.request_body.data).then((after_create) => {
        if(!after_create){
          res.send({
            message: "Cannot setup notifications for User " + username + ". Maybe User was not found or request data is empty!"
          });
        } else{
          res.send({ 
            message: "Initial notification setup successful!",
          });
        }
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
      }
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: err.message });
  });
};

//Notification Log
exports.getNotiLog = (req, res, next) => {
  const userid = req.body.request_body.user.id.toString();
  NotificationLog.findAll({
    where: { user_id: userid },
    order: [["createdAt", 'DESC']] 
  }).then(data => {
    if (!data) {
      return res.status(404).send({ message: "Data Not found." });
    } else{
      res.status(200).send({ 
        message: data
      });
     }
  }).catch(err => {
    console.log(err);
    res.status(500).send({ message: err.message });
  });
};