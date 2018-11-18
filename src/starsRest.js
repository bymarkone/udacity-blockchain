const blockchain = require('./blockchain'),
			utils = require('./utils'),
			validationService = require('./validationService'),
      { Block } = require('./block')

const post = (req, res) => utils.validate(req.body.address) 
	.then(utils.validate(req.body.star))	
	.then(() => validationService.isValid(req.body.address))
	.then(() => blockchain.get().addBlock(new Block(req.body)))
	.then(utils.withSuccess(res))
	.catch(utils.withUnprocessedEntity(res))

module.exports = {
	post
}
