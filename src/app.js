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
app.use(bodyParser.urlencoded({ extended: false }))

const withSuccess = (res) => (result) => res.send(result)
const withNotFound = (res) => (result) => res.sendStatus(404)
const withUnprocessedEntity = (res) => () => res.sendStatus(422)

const validate = async (req) => { if (!req.body.body) throw new Error() } 

app.get('/block/:id', (req, res) => blockchain.get()
      .getBlock(req.params.id)
      .then(withSuccess(res))
      .catch(withNotFound(res)))

app.post('/block', (req, res) => validate(req)
      .then(() => blockchain.get().addBlock(new Block(req.body.body)))
      .then(withSuccess(res))
      .catch(withUnprocessedEntity(res)))

app.listen(port, () => console.log(`Listening port ${port}!`))

module.exports = app
