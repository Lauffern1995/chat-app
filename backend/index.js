
const express = require('express')

const app = express()

const port = 3001;


app.get('/home', (req, res) => {
  return res.send('Home Screen')

})

app.get('/login', (req, res) => {
  return res.send('Login Screen!')

})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})