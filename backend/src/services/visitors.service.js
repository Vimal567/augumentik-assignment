const {Visitors} = require("../models/visitors.model");

const getVistorsList = async () => {
    return await Visitors.find({});
};

const addNewVistor = async (payload) => {
    const newPayload = new Visitors(payload);
    const data = await newPayload.save();
    return data;
};

module.exports = {
    getVistorsList,
    addNewVistor
};
