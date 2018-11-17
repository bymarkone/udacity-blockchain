const utils = require('./utils'),
			validationService = require('./validationService')

const requestValidation = (req, res) => utils.validate(req.body.address)
  .then(() => res.send(validationService.add(req.body.address)))

const validate = (req, res) => utils.validate(req.body.address)
	.then(utils.validate(req.body.signature))
	.then(() => res.send({ 
		registerStar: true,
		status: validationService.validate(req.body.address, req.body.signature)
	}))

module.exports = {
	requestValidation,
	validate
}
