const User = require('../models').User

const sequelize = require('sequelize')

exports.update = async (req, res) => {
    try {

        if (req.file) {
            req.body.avatar = req.file.filename
        }

        if (typeof req.body.avatar !== 'undefined' && req.body.avatar === 0) {
            delete req.body.avatar 
        }
        
        const [rows, result] = await User.update(req.body, {
            where: {
                id: req.user.id,
            },
            returning: true,
            individualHooks: true,
        })
        const user = result[0].get({ raw: true })
        console.log(user);
        
        user.avatar = result[0].avatar
        delete user.password
        return res.send(user)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }

}
