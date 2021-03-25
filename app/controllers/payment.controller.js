const db = require("../models");
const Payment = db.payment_table;//payment model
const PayLog = db.paylog_table;//payment model
const { request } = require("express");

exports.getPay = (req, res, next) => {
  const userid = req.body.request_body.user.id.toString();
  Payment.findAll({where: { user_id: userid }}).then(data => {
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

exports.updPay = (req, res) => {
  const userid = req.body.request_body.user.id
  const username = req.body.request_body.user.username
  Payment.update(req.body.request_body.data, {where: {user_id: userid}}).then(num => { //update notifications and respond to views.
    if (num == 1) {
      res.send({
        message: "Payments setup successful."
      });
    } else {
      Notification.create(req.body.request_body.data).then((after_create) => {
        if(!after_create){
          res.send({
            message: "Cannot setup payments for User " + username + ". Maybe User was not found or request data is empty!"
          });
        } else{
          res.send({ 
            message: "Initial payment setup successful!",
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

//Payment Logs
exports.getPayLogs = (req, res, next) => {
  const userid = req.body.request_body.user.id.toString();
  PayLog.findAll({where: { user_id: userid }}).then(data => {
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
