const { model, Schema } = require('mongoose');

module.exports = model("server_profiles ", Schema({
    _id: String,
    created: {
        type: Number,
        default: Date.now()
    },
}))