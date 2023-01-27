const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const contentService = require("../services/content.service");

const getContent = catchAsync(async (req, res) => {
    const data = await contentService.getContent();
    res.status(httpStatus.OK).send(data);
});

const postContent = catchAsync(async (req, res) => {
    const payload = req.body;
    const data = await contentService.postContent(payload);
    res.status(httpStatus.CREATED).send(data);
});

const updateContent = catchAsync(async (req, res) => {
    const payload = req.body;
    const data = await contentService.updateContent(payload);
    res.status(httpStatus.CREATED).send(data);
});

module.exports = {
    getContent,
    postContent,
    updateContent
};
