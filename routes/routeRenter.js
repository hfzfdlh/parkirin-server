const RenterController = require('../controller/renterController')
const { authenticationRenter } = require('../middlewares/authentication')

const router  = require('express').Router()

router.post('./login',RenterController.postLogin)
router.post('./register',RenterController.postRegister)
router.use(authenticationRenter)

module.exports = router