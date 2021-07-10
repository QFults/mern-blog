const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')

router.get('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.find({})
    .populate('author')
    .populate({
      path: 'comments',
      model: 'Comment',
      populate: {
        path: 'author',
        model: 'User'
      }
    })
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

router.post('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.create({
    title: req.body.title,
    body: req.body.body,
    author: req.user._id
  })
    .then(post => {
      User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
        .then(() => {
          res.json({
            id: post._id,
            title: post.title,
            body: post.body,
            author: req.user,
            comments: []
          })
        })
    })
})

module.exports = router
