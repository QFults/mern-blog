const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/users/register', (req, res) => {
  const { name, email, username } = req.body
  User.register(new User({ name, email, username }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})

router.get('/users/:username', passport.authenticate('jwt'), (req, res) => {
  User.findOne({ username: req.params.username })
    .populate('posts')
    .then(user => res.json(user))
    .catch(err => console.log(err))
})

module.exports = router
