const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
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
    }
  }
);


const Blog = mongoose.model('Blog', blogSchema);

module.exports.Blog = Blog;