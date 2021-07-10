const { model, Schema } = require('mongoose')

const Comment = new Schema({
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

model.exports = model('Comment', Comment)
