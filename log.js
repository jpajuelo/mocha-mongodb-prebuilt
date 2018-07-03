const mongoose = require('mongoose')

module.exports.Log = mongoose.model('Log', {
  level: String
})
