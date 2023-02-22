const cloudinary = require("cloudinary");
const User = require("../models/user");
const Symptoms = require('../models/symptomData')
const cookies = require("../utils/cookieToken")
const mailHelper = require("../utils/mailHelper")
const crypto = require('crypto')
const passport = require('passport')
require('../utils/googleAuth')
const {invalid,success,
        missing,
        notFound} = require("../utils/response");
const { async } = require("rxjs");
const { log } = require("console");


exports.signUp = async (req, res, next) => {
  try {
    const { firstName,lastName, email, password, gender, city, dateOfBirth ,contact} = req.body;

  if (!email || !firstName || !lastName || !password || !gender || !city || !dateOfBirth || !contact) {
    return next(missing(res, "All fields required"));
  } 
  const user2 = await User.findOne({
    $or:[
      {email},
      {contact}
    ]
  }) 
  if(user2){
    invalid(res, 'Email or contact  already exist');
  }
 
  if (!user2) {
    if(req.files){
      let file = req.files.photo;
      const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "users",
        width: 150,
        crop: "scale",
      });
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        gender, 
        contact,
        city,
        dateOfBirth,
        photo: {
          id: result.public_id,
        },
      });
      cookies(user, res);
    }else{
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        gender, 
        contact,
        city,
        dateOfBirth,
      });
    cookies(user, res);
    }
  } 
  } catch (error) {
    console.log(error);
  }
};

exports.logIn = async (req,res,next) =>{
    const {email, password} = req.body
    if(!email || !password){
        return next(missing(res,`All fields are required`));
    } 

    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(notFound(res,`User does not exist`))
    }

    const isPasswordCorrect = await user.isValidatedPassword(password,user);

    if(!isPasswordCorrect){
        return next(missing(res,`Email or password does not match`))
    }

    cookies(user,res)
}

exports.logOut = async (req,res,next) =>{
  res.cookie('token', null,{
    expires: new Date(Date.now()),
    httpOnly: true
  })
  success(res,`Logged out`)
}

exports.forgotPassword = async(req,res,next) =>{
    const{email} = req.body
    const user = await User.findOne({email})
    if(!user){
      return next (notFound(res,`User does not exist`))
    }
    const forgotToken = user.getForgotPasswordToken()
    await user.save({validateBeforeSave: false})
    const myUrl = `${req.protocol}://localhost:4200/reset/${forgotToken}`
    const message = `Copy paste this url ${myUrl}`
    try {
      await mailHelper({
        email: user.email,
        subject: "Password Reset Email",
        message,
        link: myUrl
      })
      success(res,`Email sent successfully`)
    } catch (error) {
      user.forgotPasswordToken = undefined
      user.forgotPasswordTokenExpiry = undefined
      await user.save({validateBeforeSave:false})
      return next(error)
    }
}

exports.resetPassword = async(req,res,next) =>{
  const token = req.params.token 
  const encryToken = crypto.createHash("sha256").update(token).digest("hex")
  const user = await User.findOne({
    
      forgotPasswordToken: {$eq :encryToken },
      forgotPasswordTokenExpiry : {$lt : Date.now()}
  });

  if(!user){
    console.log('no user')
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      invalid(res,`Invalid password`)
    );
  }

  user.password = req.body.password

  user.forgotPasswordToken = undefined;
  user.forgotPasswordTokenExpiry = undefined;

  await user.save();
  cookies(user,res)
}


// exports.googleLogin = async(req,res,next) =>{
//   await passport.authenticate('google', {scope: ['email', 'profile']})
//   console.log('enntry')
// }


// exports.googleLoginCall = async(req,res,next) =>{
//   passport.authenticate('google',{
//     failureRedirect:'/api/v1/auth/failure'
//   })
//   //res.redirect('/api/v1/aw')
  
//   res.redirect('/api/v1/protected')
  
// }

// exports.isLoggedInUsingGoogle = async(req,res,next)=>{
//   console.log('enter')
//   req.user ? next() : console.log('notSs')
// }


exports.adminUpdateRole = async(req,res,next) =>{
    const {role,email} = req.body
  const filter = {email : `${email}`}
  const update = {role: `${role}`}
  const user = await User.findOneAndUpdate(filter,update,{
    new:true
  })
  res.json({
    success:true,
    message:`Role updated to ${role}`,
    status:200
  }).status(200)
}


exports.userDashboard = async(req,res,next) =>{
    const user = req.user
    //console.log(user);
   // res.send(user).status(200)
   res.json({
    user,
    "status":200,
    success:true
   })

}


exports.updateUser = async(req,res,next) =>{
    if(req.files){
      const user = req.user
      let file = req.files.photo
      const result = await cloudinary.v2.uploader.upload(file.tempFilePath,{
        folder:"users",
        width:150,
        crop:"scale"
      });
      const filter = {email: `${user.email}`}
      const update = {photo:`${result.public_id}`}
       const user2 = await User.findOneAndUpdate(filter,update,{
        new:true,
        upsert:true
       })
      res.json({
        success:true,
        message:'Image updated',
        status:200,
        imageUrl:`${result.public_id}`
      })
    }else{
      res.send('Add image to upload')
    }
}
