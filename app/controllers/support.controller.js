const db = require("../models");
const Support = db.support_table;//user model
const { request } = require("express");

exports.getSupport = (req, res, next) => {
  Support.findAll().then(data => {
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