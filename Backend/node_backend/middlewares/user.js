const user = require('../models/user')
const jwt = require('jsonwebtoken')
const{missing} = require('../utils/response')

exports.isLoggedIn = async(req,res,next) =>{
    const token = req.cookies.token || req.header("Authorization");

    if(!token){
        return next(missing(res,`Login first to access service`))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await user.findById(decoded.id)

     next();
}