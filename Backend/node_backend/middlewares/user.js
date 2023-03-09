const user = require('../models/user')
const jwt = require('jsonwebtoken')
const{missing} = require('../utils/response')

exports.isLoggedIn = async(req,res,next) =>{
    const token = req.cookies.token || req.header("Authorization");

    if(!token){
        return (missing(res,`Login first to access service`))
        //return next(res.send('not allowed'))
    }

    const decoded =  jwt.verify(token, process.env.JWT_SECRET)
    req.user = await user.findById(decoded.id)
    req.user.password = undefined;

     next();
}

exports.isAdmin = (...roles) =>{
    return(req,res,next) =>{
        console.log(req.user);
        if(!roles.includes(req.user.role)){
           return  (missing(res,'You are not allowed to access'))
        }
        next()
    }
}