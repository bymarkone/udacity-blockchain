const express = require('express'),
      bodyParser = require('body-parser'),
			blocks = require('./blocksRest'),
			users = require('./usersRest'),
			stars = require('./starsRest'),
      app = express(),
      port = 8000

const withSuccess = (res) => (result) => res.send(result)
const withNotFound = (res) => (result) => res.sendStatus(404)
const withUnprocessedEntity = (res) => () => res.sendStatus(422)
const validate = async (object) => { if (!object) throw new Error() } 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/block/:id', blocks.get)
app.post('/block', stars.postStar )
app.post('/requestValidation', users.requestValidation)
app.post('/message-signature/validate', users.validate)
app.post('/stars', stars.postStar)
app.get('/stars/address::address', stars.byAddress)
app.get('/stars/hash::hash', stars.byHash)

app.listen(port, () => console.log(`Listening port ${port}!`))

module.exports = app
