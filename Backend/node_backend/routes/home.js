const router  = require('express').Router()
const {home} = require('../controllers/home')
const passport = require('passport')
require('../utils/googleAuth')

router.route('/h').get((req,res) =>{
    res.send(`<a href = "/api/v1/auth/google">Authenticate with google</a>`)
})

router.route('/auth/google').get(
    passport.authenticate('google', {scope: ['email', 'profile']})
)

router.route('/auth/google/callback').get((req,res) =>{
    passport.authenticate('google',{
        failureRedirect:'/api/v1/auth/failure'
    })
    res.redirect('/api/v1/aw')
}
)

router.route('/aw').get((req,res)=>{
    res.send('hello')
})

router.route('/auth/failure').get((req,res) =>{
    res.send('someting went wrong')
})

router.route('/protected').get((req,res) =>{
    res.send('Hello')
})
router.route('/').get(home)

module.exports = router