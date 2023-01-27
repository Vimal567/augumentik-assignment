const mongoose = require('mongoose');

const contentSchema = mongoose.Schema(
  {
    heading: {
      type: String,
      required: true
    },
    paragraph: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
);


const Content = mongoose.model('Content', contentSchema);

module.exports.Content = Content;