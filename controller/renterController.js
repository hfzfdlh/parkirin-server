const { checkPass } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const {Renter, RenterProfile} = require('../models')
const {OAuth2Client} = require('google-auth-library');

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

    static async postGoogleLogin(req,res,next){
        try{  
            const client = new OAuth2Client();
           
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();


            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            
            //check email
            const [renter,isCreated] = await Renter.findOrCreate({
                where:{
                    email:payload.email
                }, defaults:{
                    email:payload.email,
                    password:String(Math.random()*1000),
                },
                hooks: false
            });

            const [renterprofile,isRenterCreated] = await RenterProfile.findOrCreate({
                where:{
                    RenterId:renter.id
                }, defaults:{
                    name:payload.name,
                    address:'-',
                    phoneNumber:'-',
                    photoUrl:payload.picture,
                    money:0,
                    RenterId:renter.id
                },
                hooks: false
            });

            const access_token = createToken(renter.id)
            let status = 200
            if (isCreated) status= 201
            res.status(status).json({access_token})
        } catch (err) {
            next(err)
        }
    }

    static async postRegister(req,res,next){
        try {
            const {email,password,name,phoneNumber,address} = req.body
            const photoUrl = 'image_user/'+req.files.photoUrl[0].filename
            if(!email) throw{name:"noEmail"}
            if(!password) throw{name:"noPass"}

            const newRenter = await Renter.create({email,password})
            const money = 0
            const newRenterProfile = await RenterProfile.create({name,phoneNumber,address,photoUrl,RenterId:newRenter.id,money})

            res.status(201).json({id:newRenter.id,email:newRenter.email})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = RenterController