const router = require('express').Router()
const {getSymptoms,resetGlobalSymptomData} = require('../../python_backend/nodePython')
const {isAdmin, isLoggedIn} = require('../middlewares/user')
router.route('/getDisease').post(isLoggedIn,getSymptoms)

//router.route('/resetdata').get(isLoggedIn,isAdmin('admin'),resetGlobalSymptomData)
module.exports = router