const { model, Schema } = require('mongoose')

const Comment = new Schema({
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Comment', Comment)
