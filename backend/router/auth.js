const router = require('express').Router()
const { login, register } = require('../controllers/authController')

const {body} = require('express-validator')

router.post('/login', login)

router.post('/register', [
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('gender').notEmpty(),
  body('email').isEmail(),
  body('firstName').isLength({ min: 5 }),
  
 ], register)

module.exports = router
