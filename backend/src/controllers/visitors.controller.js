const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const visitorsService = require("../services/visitors.service");

const getVistorsList = catchAsync(async (req, res) => {
    const data = await visitorsService.getVistorsList();
    res.status(httpStatus.OK).send(data);
});

const addNewVistor = catchAsync(async (req, res) => {
    const payload = req.body;
    const data = await visitorsService.addNewVistor(payload);
    res.status(httpStatus.CREATED).send(data);
});


module.exports = {
    getVistorsList,
    addNewVistor
};
