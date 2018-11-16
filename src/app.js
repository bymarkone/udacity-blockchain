const express = require('express'),
      bodyParser = require('body-parser'),
      { Blockchain } = require('./blockchain'),
      { Block } = require('./block'),
      validationRequests = {},
      app = express(),
      port = 8000

const blockchain = (() => {
  let instance = () => {}
  new Blockchain().then(result => instance = result)
  return {
    get: () => instance
  }
})()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const withSuccess = (res) => (result) => res.send(result)
const withNotFound = (res) => (result) => res.sendStatus(404)
const withUnprocessedEntity = (res) => () => res.sendStatus(422)

const validate = async (object) => { if (!object) throw new Error() } 

app.get('/block/:id', (req, res) => blockchain.get()
      .getBlock(req.params.id)
      .then(withSuccess(res))
      .catch(withNotFound(res)))

app.post('/block', (req, res) => validate(req.body.body)
      .then(() => blockchain.get().addBlock(new Block(req.body.body)))
      .then(withSuccess(res))
      .catch(withUnprocessedEntity(res)))

app.post('/requestValidation', (req, res) => validate(req.body.address)
  .then(() => {
      const timestamp = Date.now() / 1000 | 0
      const validationRequest = {
        address: req.body.address,
        requestTimeStamp: timestamp,
        message: req.body.address.concat(':').concat(timestamp).concat(':starRegistry'),
        validationWindow: 300
      }
      validationRequests[req.body.address] = validationRequest
      res.send(validationRequest)
    }))

app.post('/message-signature/validate', (req, res) => {
 
  const previousRequest = validationRequests[req.body.address]
  const timestamp = Date.now() / 1000 | 0
  const validationWindow = 300 - (timestamp - previousRequest.requestTimeStamp)

  const response = {
    registerStar: true,
    status: {
      address: req.body.address,
      requestTimeStamp: previousRequest.requestTimeStamp,
      message: previousRequest.message,
      validationWindow: validationWindow,
      messageSignature: 'valid'
    }
  }
  res.send(response)
})

app.listen(port, () => console.log(`Listening port ${port}!`))

module.exports = app
