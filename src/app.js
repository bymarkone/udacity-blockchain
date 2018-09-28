const express = require('express'),
      bodyParser = require('body-parser'),
      { Blockchain } = require('./blockchain'),
      { Block } = require('./block'),
      app = express(),
      port = 8000

const blockchain = (() => {
  let instance = () => {}
  new Blockchain().then(result => instance = result)
  return {
    get: () => instance
  }
})()

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Welcome!'))

app.get('/blocks/:id', (req, res) => blockchain.get().getBlock(req.params.id).then(block => res.send(block)))
    
app.post('/blocks', (req, res) => {
      const payload = req.body.payload
      if (!payload)
        res.sendStatus(422)
      else
        blockchain.get().addBlock(new Block(payload))
          .then(block => res.send(block))
    })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, () => console.log(`Listening port ${port}!`))

module.exports = app
