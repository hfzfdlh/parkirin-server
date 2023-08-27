const {User,UserProfile} = require('../models')


class UserController{
    static async postLogin(req,res,next){
        try{
            const {email,password} = req.body
            if(!email) throw{name:"noEmail"}
            if(!password) throw{name:"noPass"}

            const getUser = await User.findOne({where:{email}})

            if(!getRenter) throw{name:"invalidUser"}

            const verifPass = checkPass(password,getUser.password)

            if(!verifPass) throw{name:"invalidUser"}

            const access_token = createToken(getUser.id)

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

            const newUser = await User.create({email,password})

            const newUserProfile = await UserProfile.create({name,phoneNumber,address,photoUrl,UserId:newUser.id})

            res.status(201).json({id:newUser.id,email:newUser.email})
        } catch (err) {
            next(err)
        }
    }
}


module.exports = UserController