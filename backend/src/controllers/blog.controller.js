const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const blogService = require("../services/blog.service");

const getBlog = catchAsync(async (req, res) => {
    const data = await blogService.getBlog();
    res.status(httpStatus.OK).send(data);
});

const postBlog = catchAsync(async (req, res) => {
    const payload = req.body;
    const data = await blogService.postBlog(payload);
    res.status(httpStatus.CREATED).send(data);
});

const updateBlog = catchAsync(async (req, res) => {
    const payload = req.body;
    const data = await blogService.updateBlog(payload);
    res.status(httpStatus.CREATED).send(data);
});
const deleteBlog = catchAsync(async (req, res) => {
    await blogService.deleteBlog();
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    getBlog,
    postBlog,
    updateBlog,
    deleteBlog
};
