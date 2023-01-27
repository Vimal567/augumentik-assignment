const mongoose = require('mongoose');

const visitorsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        }
    }
);


const Visitors = mongoose.model('Visitors', visitorsSchema);

module.exports.Visitors = Visitors;