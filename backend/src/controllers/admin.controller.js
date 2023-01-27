const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const adminService = require("../services/admin.service");

const getAdmin = catchAsync(async (req, res) => {
    const data = await adminService.getAdmin();
    res.status(httpStatus.OK).send(data);
});

const postAdmin = catchAsync(async (req, res) => {
    const payload = req.body;
    const data = await adminService.postAdmin(payload);
    res.status(httpStatus.CREATED).send(data);
});


module.exports = {
    getAdmin,
    postAdmin
};