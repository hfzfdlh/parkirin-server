const { checkPass } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const {User,UserProfile,Renter,RenterProfile,ParkingSpace, Transaction} = require('../models')
const { Op } = require('sequelize')
const midtransClient = require('midtrans-client');
const {OAuth2Client} = require('google-auth-library');


class UserController{
    static async postLogin(req,res,next){
        try{
            console.log('masuk sini')
            const {email,password} = req.body
            if(!email) throw{name:"noEmail"}
            if(!password) throw{name:"noPass"}

            const getUser = await User.findOne({where:{email}})

            if(!getUser) throw{name:"invalidUser"}

            const verifPass = checkPass(password,getUser.password)

            if(!verifPass) throw{name:"invalidUser"}

            const access_token = createToken(getUser.id)

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
            const [user,isCreated] = await User.findOrCreate({
                where:{
                    email:payload.email
                }, defaults:{
                    email:payload.email,
                    password:String(Math.random()*1000),
                },
                hooks: false
            });

            const [userprofile,isUserCreated] = await UserProfile.findOrCreate({
                where:{
                    UserId:user.id
                }, defaults:{
                    name:payload.name,
                    address:'-',
                    phoneNumber:'-',
                    photoUrl:payload.picture,
                    money:0,
                    UserId:user.id
                },
                hooks: false
            });

            const access_token = createToken(user.id)
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

            const newUser = await User.create({email,password})
            const money = 0
            const newUserProfile = await UserProfile.create({name,phoneNumber,address,photoUrl,UserId:newUser.id,money})

            res.status(201).json({id:newUser.id,email:newUser.email})
        } catch (err) {
            next(err)
        }
    }

    static async getSingleUser(req,res,next){
        try {
            const { email } = req.user
            
            const getUser = await User.findOne({where:{email},include:UserProfile})
       
            if(!getUser) throw{name:'unauthenticated'}


            res.status(200).json(getUser)
        } catch (err) {
            next(err)
        }
    }

    static async postParkingSpaces(req,res,next){
        try {
            console.log('req.body',req.body)
            const latitude = req.body.lat
            const longitude = req.body.lng
            const latmax = latitude + 0.01
            const latmin = latitude - 0.01
            const lngmax = longitude + 0.01
            const lngmin = longitude- 0.01

            const getPark = await  ParkingSpace.findAll({where:{
                lat:{[Op.between]:[latmin,latmax]},
                lng:{[Op.between]:[lngmin,lngmax]}
            }

            })
            if(getPark.length>0){
                const getParkComp = await ParkingSpace.findAll({where:{
                    lat:{[Op.between]:[latmin,latmax]},
                    lng:{[Op.between]:[lngmin,lngmax]}
                },include:{model:Renter,include:RenterProfile}})
                console.log('getPark',getParkComp[0].Renter.RenterProfile)
        
                res.status(200).json(getParkComp)
            } else{
                res.status(200).json(getPark)
            }
        } catch (err) {
            next(err)
        }
    }

    static async postGenMidtrans(req,res,next){
        try {
            const user = await User.findByPk(req.user.id,{include:UserProfile})
            const { money } = req.body
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : process.env.MIDTRANS_SERVER_KEY
            });
          
            let parameter = {
                "transaction_details": {
                    "order_id": "TRANS_ID_" +Math.floor(1000000 + Math.random() * 8000000), //UNIQUE
                    "gross_amount": money
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    // "first_name": user.UserProfile.name,
                    // "last_name": "pratama",
                    "email": user.email,
                    // "phone": "08111222333"
                }
            };

            const midtrans_token = await snap.createTransaction(parameter)
            res.status(201).json(midtrans_token)
        } catch (err) {
            next(err)
        }
    }

    static async patchMoney(req,res,next){
        try {
            const { id } = req.user
            const { money } = req.body
 
            const addMoney = await UserProfile.increment('money',{where:{UserId:id},by:money})

            res.status(200).json({message:"Uang berhasil ditambahkan"})

        } catch (err) {
            next(err)
        }
    }

    static async patchRedMoney(req,res,next){
        try {
            const { id } = req.user
            const { money } = req.body
 
            const redMoney = await UserProfile.decrement('money',{where:{UserId:id},by:money})

            res.status(200).json({message:"Uang berhasil dikurangkan"})

        } catch (err) {
            next(err)
        }
    }

    static async getActiveTransaction(req,res,next){
        try {
            const { id } = req.user
            
            const getActTrans = await Transaction.findAll({where:{
                UserId:id,
                status:'Active'
            }})
            
            res.status(200).json(getActTrans)

        } catch (err) {
            next(err)
        }
    }

    static async getAllTransaction(req,res,next){
        try {
            const { id } = req.user
            
            const getTrans = await Transaction.findAll({where:{
                UserId:id
            },include:{model:Renter,include:ParkingSpace}})
            console.log(getTrans[0].Renter.ParkingSpaces)
            res.status(200).json(getTrans)

        } catch (err) {
            next(err)
        }
    }

    static async putUser(req,res,next){
        try {
            const {name,phoneNumber,address} = req.body
            const photoUrl = 'image_user/'+req.files.photoUrl[0].filename
            
            const updateUserProfile = await UserProfile.update({name,phoneNumber,address,photoUrl},{where:{UserId:req.user.id}})

            res.status(201).json({message:"User Updated"})
        } catch (err) {
            next(err)
        }
    }

    static async postOrderParking(req,res,next){
        try {
            const { RenterId } = req.params
            const UserId = req.user.id
            const paid = req.body.money
            const status='Active'
            const newTrans = await Transaction.create({UserId,RenterId,paid,status})
            console.log(newTrans)
            res.status(201).json({message:"Transaction Successful"})
        } catch (err) {
            next(err)
        }
    }

}


module.exports = UserController