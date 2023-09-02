const multer = require('multer')
const path = require('path')

let storageProfileUser =  multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname,"../public/image_user"))
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname +"-" + Date.now() + path.extname(file.originalname))
    }
})

let storageProfileRenter =  multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname,"../public/images"))
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname +"-" + Date.now() + path.extname(file.originalname))
    }
})

const uploadProfileUser = multer({storage:storageProfileUser}).fields([{name:'photoUrl',maxCount:1}])
const uploadProfileRenter= multer({storage:storageProfileRenter}).fields([{name:'photoUrl',maxCount:1}])

module.exports = {uploadProfileUser,uploadProfileRenter}