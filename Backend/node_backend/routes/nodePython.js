const router = require('express').Router()
const {getSymptoms} = require('../../python_backend/nodePython')

router.route('/getDisease').post(getSymptoms)

module.exports = router