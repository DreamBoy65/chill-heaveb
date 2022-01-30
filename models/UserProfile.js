const { model, Schema } = require('mongoose');

module.exports = model("user_profiles ", Schema({
    _id: String,
    created: {
        type: Number,
        default: Date.now()
    },
    id: {
      type: Number,
      default: null
    },
    cash: {
      type: Number,
      default: 100
    },
    factory: {
      name: {
        type: String,
        default: null
      },
      workers: {
        type: Array,
        default: []
      },
      level: {
        type: Number,
        default: 1
      },
      limit: {
        type: Number,
        default: 25
      },
      owner: {
        type: String,
        default: null
      },
    },
    bio: {
      type: String,
      default: "Im Worker!"
    },
    multiplier: {
      time: {
        type: Number,
        default: 0
      },
      used: {
        type: Number,
        default: 0
      },
      moves: {
        type: Number,
        default: 0
      }
    }
}))