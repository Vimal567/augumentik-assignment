const express = require("express");
const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.get("/", adminController.getAdmin);
router.post("/", adminController.postAdmin);

module.exports = router;