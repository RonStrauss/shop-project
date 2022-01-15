module.exports = (req, res, next) =>{
    if (req.session.user?.role === 'user') {next()}
    else { return res.status(401).send({err:true,msg:"Secure content, please log in before accessing!"})}
}