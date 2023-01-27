const {Content} = require("../models/content.model");

const getContent = async () => {
    return await Content.find({});
};

const postContent = async (payload) => {
    const newPayload = new Content(payload);
    const data = await newPayload.save();
    return data;
};

const updateContent = async (payload) => {
    const oldContent = await getContent();
    const id = oldContent[0].id;
    await Content.deleteOne({id: id});
    const data = await postContent(payload);
    return data;
};

module.exports = {
    getContent,
    postContent,
    updateContent
};
