const { verifyToken } = require("../helpers/jwt")
const { User,Renter } = require("../models")


async function authenticationUser(req,res,next){
    try {

        const {access_token} = req.headers
        if (!access_token) throw {name:"unauthenticated"}

        const payload = verifyToken(access_token)

        const getUser = await User.findByPk(payload.id)

        if(!getUser) throw{name:"unauthenticated"}

        req.user = {
            id:getUser.id,
            email:getUser.email,
            role:'User'
        }

        next()
    } catch (err) {
        next(err)
    }
}

async function authenticationRenter(req,res,next){
    try {
        const {access_token} = req.headers
        if (!access_token) throw {name:"unauthenticated"}

        const payload = verifyToken(access_token)

        const getUser = await Renter.findByPk(payload.id)

        if(!getUser) throw{name:"unauthenticated"}

        req.user = {
            id:getUser.id,
            email:getUser.email,
            role:'Renter'
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {authenticationUser, authenticationRenter}