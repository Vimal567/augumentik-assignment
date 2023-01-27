const express = require("express");
const contentController = require("../controllers/content.controller");

const router = express.Router();

router.get("/", contentController.getContent);
router.post("/", contentController.postContent);
router.put("/", contentController.updateContent);

module.exports = router;