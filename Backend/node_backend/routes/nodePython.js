const router = require('express').Router()
const {getSymptoms} = require('../../python_backend/nodePython')
const {isLoggedIn} = require('../middlewares/user')
router.route('/getDisease').post(isLoggedIn,getSymptoms)

module.exports = router