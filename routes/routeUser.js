const UserController = require('../controller/userController')
const { uploadProfileUser } = require('../helpers/imageUploader')
const { authenticationUser } = require('../middlewares/authentication')

const router  = require('express').Router()

router.post('/login',UserController.postLogin)
router.post('/google-login',UserController.postGoogleLogin)
router.post('/register',uploadProfileUser,UserController.postRegister)
router.use(authenticationUser)
router.get('/user',UserController.getSingleUser)
router.get('/transactions',UserController.getAllTransaction)
router.get('/active-transactions',UserController.getActiveTransaction)
router.post('/parking',UserController.postParkingSpaces)
router.post('/generate-midtrans-token',UserController.postGenMidtrans)
router.patch('/add-money',UserController.patchMoney)
router.patch('/red-money',UserController.patchRedMoney)
router.put('/edit-user',uploadProfileUser,UserController.putUser)
router.post('/order-park/:RenterId',UserController.postOrderParking)


module.exports = router