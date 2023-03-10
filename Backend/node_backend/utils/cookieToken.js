const cookieToken = async(user,res) =>{
    console.log('enter');
    const token = user.getJwtToken();
    const options = {
        expires : new Date(
            Date.now() + process.env.COOKIE_TIME * 24 * 60 *  60 * 1000 
        )
    }
    user.password = undefined
    res.status(200).cookie("token",token,options).json({
        success : true,
        status:200,
        token,
        user
    })
}

module.exports = cookieToken