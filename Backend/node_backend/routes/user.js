const router  = require('express').Router()
const {signUp,logIn,forgotPassword,resetPassword,logOut,adminUpdateRole,userDashboard,updateUser} = require('..//controllers/user')
const {isAdmin, isLoggedIn} = require('../middlewares/user')
router.route('/signup').post(signUp)
router.route('/login').post(logIn)
router.route('/forgot').post(forgotPassword)
router.route('/updaterole').post(isLoggedIn,isAdmin('admin'),adminUpdateRole)
router.route('/password/reset/:token').post(resetPassword)
router.route('/logout').get(logOut)
router.route('/userdashboard').get(isLoggedIn,userDashboard)

router.route('/updateuser').post(isLoggedIn,updateUser)



module.exports = router