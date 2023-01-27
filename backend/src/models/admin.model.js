const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    }
  }
);


const Admin = mongoose.model('Admin', blogSchema);

module.exports.Admin = Admin;