const utils = require('./utils'),
			validationRequests = {}

const requestValidation = (req, res) => utils.validate(req.body.address)
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
    })

const validate = (req, res) => {
 
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
}

module.exports = {
	requestValidation,
	validate
}
