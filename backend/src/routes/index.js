const express = require('express');
const contentRoute = require("./content.route");
const visitorsRoute = require("./visitors.route");
const blogRoute = require("./blog.route");
const adminRoute = require("./admin.route");
const contactRoute = require("./contact.route");

const router = express.Router();

router.use("/content", contentRoute);
router.use("/visitors", visitorsRoute);
router.use("/blog", blogRoute);
router.use("/admin", adminRoute);
router.use("/contact", contactRoute);

module.exports = router;
