const express = require("express");
const router = express.Router();
const es6Controller = require("../controller/es6Controller");

router.get("/", es6Controller.findAll);
router.post("/", es6Controller.create);



module.exports = router;