const express = require("express");
const vistorsController = require("../controllers/visitors.controller");

const router = express.Router();

router.get("/", vistorsController.getVistorsList);
router.post("/", vistorsController.addNewVistor);

module.exports = router;