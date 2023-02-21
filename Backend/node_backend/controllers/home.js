exports.home =  async(req,res,next) =>{
    res.send(`<a href = "/auth/google">Authenticate with google</a>`)
}