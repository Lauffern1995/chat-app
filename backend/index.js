const express = require('express')

const config = require('./config/app')

const router = require('./router')

const bodyParser = require('body-parser')

const cors = require('cors')

const app = express()

//WHITE LIST REACT API 
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(router)


const port = config.appPort

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
