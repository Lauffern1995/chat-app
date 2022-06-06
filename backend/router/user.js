const router = require('express').Router()
const { update } = require('../controllers/userController')
const { validate } = require('../validators')



router.post('/update', [], update)



module.exports = router
