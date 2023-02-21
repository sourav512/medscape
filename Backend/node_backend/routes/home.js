const router  = require('express').Router()
const {home} = require('../controllers/home')
const passport = require('passport')
require('../utils/googleAuth')
const{googleLogin,googleLoginCall,isLoggedInUsingGoogle} = require('../controllers/user')

// router.route('/h').get((req,res) =>{
//     res.send(`<a href = "/auth/google">Authenticate with google</a>`)
// })

// router.route('/auth/google').get(
//      passport.authenticate('google', {scope: ['email', 'profile']})
     
//     //googleLogin
// )

// router.route('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' })).get(
//     function(req,res){
//         res.redirect('/api/v1/aw')
//     }
// )

// router.route('/aw').get((req,res)=>{
//     console.log(req.user)
//     res.send('hello')
// })

// router.route('/auth/failure').get((req,res) =>{
//     res.send('someting went wrong')
// })

// router.route('/protected',isLoggedInUsingGoogle).get((req,res) =>{
//     const user = req.user
//     // res.send({
//     //     id: user.id,
//     //     name: user.displayName,
//     //     email: user.emails[0].value,
//     //     image: user.photos[0].value
//     //   });
//     console.log(user)
//     res.send(user)
// })
router.route('/').get(home)

module.exports = router