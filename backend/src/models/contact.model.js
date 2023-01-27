const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema(
  {
    facebook: {
      type: String,
      required: true
    },
    linkedin: {
      type: String,
      required: true
    },
    instagram: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  }
);


const Contact = mongoose.model('Contact', ContactSchema);

module.exports.Contact = Contact;