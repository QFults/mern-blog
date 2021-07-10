const router = require('express').Router()
const { Comment, Post } = require('../models')
const passport = require('passport')

router.post('/comments', passport.authenticate('jwt'), (req, res) => {
  Comment.create({
    text: req.body.text,
    author: req.user._id
  })
    .then(comment => {
      Post.findByIdAndUpdate(req.body.post_id, { $push: { comments: comment._id } })
        .then(() => {
          res.json({
            text: comment.text,
            author: req.user,
            post_id: req.body.post_id
          })
        })
    })
})

module.exports = router
