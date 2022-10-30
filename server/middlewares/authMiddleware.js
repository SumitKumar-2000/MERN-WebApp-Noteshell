const jwt = require('jsonwebtoken')
const User = require('../models/usermodel')

const authUserProtect = async (req,res,next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(" ")[1];
            //decodes
            const decoded = jwt.verify(token, "JWTSECRETKEY@9876543210"); // throws payload
            req.user = await User.findById(decoded.userId).select("-password"); // throws user of decoded id
            next();
        } catch(error){
            res.status(403).send("Not authorized, token failed")
        }
    }
    if(!token){
        res.status(403).send("Not authorized, no token")
    }
}

module.exports = {authUserProtect}

