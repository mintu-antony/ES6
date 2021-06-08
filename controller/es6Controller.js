const db = require('../db');
var ObjectId = require('mongodb').ObjectID;

/**
 * user creation
 */

exports.create = (req, res) => {

  db.get().collection("user").find({ name: req.body.name }).toArray(function (err, obj) {
    if (err) res.status(200).send({ message: err.message || "Some error occurred while fetching the data." });
    if (obj && obj.length > 0) {
      return res.status(200).send({ message: "User already exist" });
    }
    if (obj.length == 0) {
      var body = {
        name: req.body.name.toLowerCase(),
        age: req.body.age,
        address: req.body.address
      }
      db.get().collection("user").insertOne(body, function (err, data) {
        if (err) {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the user.",
          });
        }
        else {
          res.status(200).json({ message: "User added successfully!!!" })
        }
      })
    }
  })
}

/** 
 * function for map,filter & spread operator implementation
 */

function arrayMap(obj) {
  var res_body = []

  var add = obj.map(x => x.address.house_name.toUpperCase())
  var result = obj.filter(i => i.age >= 20)
  var last = result.map(j => j.name)
  var house_names = [...new Set(add)]

  res_body.push({
    "house_names": house_names,
    "names": last
  })

  return res_body

}


/** 
 * user full get
 */

exports.findAll = async (req, res) => {
  await db.get().collection("user").find().sort({ name: 1 }).toArray(function (err, obj) {
    if (err) res.status(500).send({ message: err.message || "Error Occured", });
    if (obj.length == 0) {
      return res.status(200).send({ message: "No users" });
    }
    else {
      res.status(200).json(arrayMap(obj))

    }

  })
};
