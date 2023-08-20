const router = require('express').Router()
const routerUser = require('./routeUser')
const routerRenter = require('./routeRenter')
const UserController = require('../controller/userController')
const RenterController = require('../controller/renterController')



router.post('/login-user',UserController.login)
router.post('/login-renter',RenterController.login)
router.post('/register-user',UserController.register)
router.post('/register-renter',RenterController.register)
router.use(authentication)
router.use('/users',routerUser)
router.use('/renters',routerRenter)

module.exports = router