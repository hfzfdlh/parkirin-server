const jwt = require('jsonwebtoken')
const key = process.env.JWT_KEY

function createToken(id){
    return jwt.sign({id:id},key)
}

function verifyToken(token){
    return jwt.verify(token,key)
}

module.exports = {
    createToken,verifyToken
}