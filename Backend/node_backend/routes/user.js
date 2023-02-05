const router  = require('express').Router()
const {signUp,logIn,forgotPassword,resetPassword} = require('..//controllers/user')

router.route('/signup').post(signUp)
router.route('/login').post(logIn)
router.route('/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)

module.exports = router