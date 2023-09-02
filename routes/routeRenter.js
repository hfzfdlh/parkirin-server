const RenterController = require('../controller/renterController')
const { uploadProfileRenter } = require('../helpers/imageUploader')
const { authenticationRenter } = require('../middlewares/authentication')

const router  = require('express').Router()

router.post('/login',RenterController.postLogin)
router.post('/google-login',RenterController.postGoogleLogin)
router.post('/register',uploadProfileRenter,RenterController.postRegister)
router.use(authenticationRenter)

module.exports = router