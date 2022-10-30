const jwt = require('jsonwebtoken')

// it will return the encrypted version of the id
const generateToken = (userId) =>{  
    return jwt.sign({ userId }, "JWTSECRETKEY@9876543210", {
      expiresIn: "100d",
    });        // gonna store id, jwt secret, expiration
}

module.exports = generateToken;