const express = require("express");
const contactController = require("../controllers/contact.controller");

const router = express.Router();

router.get("/", contactController.getContact);
router.post("/", contactController.postContact);
router.put("/", contactController.updateContact);

module.exports = router;