const express = require('express')

const config = require('./config/app')

const router = require('./router')

const app = express()

app.use(router)

const port = config.appPort

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
