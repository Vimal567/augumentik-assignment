const {Blog} = require("../models/blog.model");

const getBlog = async () => {
    return await Blog.find({});
};

const postBlog = async (payload) => {
    const newPayload = new Blog(payload);
    const data = await newPayload.save();
    return data;
};

const updateBlog = async (payload) => {
    const oldContent = await getBlog();
    const id = oldContent[0].id;
    await Blog.deleteOne({id: id});
    const data = await postBlog(payload);
    return data;
};

const deleteBlog = async () => {
    const oldContent = await getBlog();
    const id = oldContent[0].id;
    await Blog.deleteOne({id: id});
    return;
};

module.exports = {
    getBlog,
    postBlog,
    updateBlog,
    deleteBlog
};
