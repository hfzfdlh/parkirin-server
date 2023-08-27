const UserController = require('../controller/userController')
const { authenticationUser } = require('../middlewares/authentication')

const router  = require('express').Router()

router.post('./login',UserController.postLogin)
router.post('./register',UserController.postRegister)
router.use(authenticationUser)

module.exports = router