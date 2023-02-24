const router = require('express').Router()
const {getSymptoms,resetGlobalSymptomData, getDataOnDate} = require('../../python_backend/nodePython')
const {isAdmin, isLoggedIn} = require('../middlewares/user')
router.route('/getDisease').post(isLoggedIn,getSymptoms)

router.route('/resetdata').get(isLoggedIn,resetGlobalSymptomData)
router.route('/getdata').get(isLoggedIn,getDataOnDate)
module.exports = router