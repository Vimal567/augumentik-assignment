const express = require("express");
const blogController = require("../controllers/blog.controller");

const router = express.Router();

router.get("/", blogController.getBlog);
router.post("/", blogController.postBlog);
router.put("/", blogController.updateBlog);
router.delete("/", blogController.deleteBlog);

module.exports = router;