const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const contactService = require("../services/contact.service");

const getContact = catchAsync(async (req, res) => {
    const data = await contactService.getContact();
    res.status(httpStatus.OK).send(data);
});

const postContact = catchAsync(async (req, res) => {
    const payload = req.body;
    const data = await contactService.postContact(payload);
    res.status(httpStatus.CREATED).send(data);
});

const updateContact = catchAsync(async (req, res) => {
    const payload = req.body;
    const data = await contactService.updateContact(payload);
    res.status(httpStatus.CREATED).send(data);
});

module.exports = {
    getContact,
    postContact,
    updateContact
};
