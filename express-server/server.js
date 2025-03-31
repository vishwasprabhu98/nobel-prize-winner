const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const baseUrl = 'http://api.nobelprize.org/2.1'

app.use(cors())

app.get('/nobelPrizes', (req, res) => {
  fetch(baseUrl + req.url, {
    method: 'GET'
  })
  .then(resp => resp.json())
  .then(resp => res.send(resp))
})

app.get('/laureate/:id', (req, res) => {
  fetch(baseUrl + req.url, {
    method: 'GET'
  })
  .then(resp => resp.json())
  .then(resp => res.send(resp))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})