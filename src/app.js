const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000 

const db = {}

app.get('/', (req, res) => res.send('Hello World'))
app.get('/block', (req, res) => res.send({}))
app.post('/block', (req, res) => {
  const block = req.body
  db[block.height] = block
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, () => console.log(`Listening port ${port}!`))

module.exports = app
