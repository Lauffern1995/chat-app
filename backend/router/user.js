const router = require('express').Router()
const { update } = require('../controllers/userController')
const { validate } = require('../validators')
const { auth }  = require('../middleware/auth')
const { userFile } = require('../middleware/fileUpload')
const {rules: updateRules} = require('../validators/user/update')

router.post('/update', [auth, userFile, updateRules, validate], update)

module.exports = router
