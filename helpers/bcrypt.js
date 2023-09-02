const bcrypt = require('bcryptjs')

function createPass (pass){
    return bcrypt.hashSync(pass,bcrypt.genSaltSync(10))
}

function checkPass (pass,hashPass){
    return bcrypt.compareSync(pass,hashPass)
}

module.exports = {
    createPass, checkPass
}