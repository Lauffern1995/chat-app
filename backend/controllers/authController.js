const User = require('../models').User


exports.login = async (req, res) => {

  const { email, password } = req.body

  try {
        //find user
        const user = await User.findOne({
          where: {
            email
          }

        }) 
        return res.send(user)
        // check if user in DB

        //check if password in DB and matches user

        // gen auth token 
  } catch(e) {

  }
  
  return res.send([email, password])

}

exports.register = async (req, res) => {
  
}