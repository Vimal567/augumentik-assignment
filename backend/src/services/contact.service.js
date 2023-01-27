const {Contact} = require("../models/contact.model");

const getContact = async () => {
    return await Contact.find({});
};

const postContact = async (payload) => {
    const newPayload = new Contact(payload);
    const data = await newPayload.save();
    return data;
};

const updateContact = async (payload) => {
    const oldContent = await getContact();
    const id = oldContent[0].id;
    await Contact.deleteOne({id: id});
    const data = await postContact(payload);
    return data;
};

module.exports = {
    getContact,
    postContact,
    updateContact
};
