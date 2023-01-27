const {Admin} = require("../models/admin.model");

const getAdmin = async () => {
    return await Admin.find({});
};

const postAdmin = async (payload) => {
    const newPayload = new Admin(payload);
    const data = await newPayload.save();
    return data;
};

module.exports = {
    getAdmin,
    postAdmin
};
