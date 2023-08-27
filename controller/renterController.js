const { checkPass } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const {Renter, RenterProfile} = require('../models')

class RenterController{
    static async postLogin(req,res,next){
        try{
            const {email,password} = req.body
            if(!email) throw{name:"noEmail"}
            if(!password) throw{name:"noPass"}

            const getRenter = await Renter.findOne({where:{email}})

            if(!getRenter) throw{name:"invalidUser"}

            const verifPass = checkPass(password,getRenter.password)

            if(!verifPass) throw{name:"invalidUser"}

            const access_token = createToken(getRenter.id)

            res.status(200).json({access_token})
        }
        catch(err){
            next(err)
        }
    }

    static async postRegister(req,res,next){
        try {
            const {email,password,name,phoneNumber,address,photoUrl} = req.body
            if(!email) throw{name:"noEmail"}
            if(!password) throw{name:"noPass"}

            const newRenter = await Renter.create({email,password})

            const newRenterProfile = await RenterProfile.create({name,phoneNumber,address,photoUrl,RenterId:newRenter.id})

            res.status(201).json({id:newRenter.id,email:newRenter.email})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = RenterController