const blockchain = require('./blockchain'),
      { Block } = require('./block'),
			utils = require('./utils')

const get = (req, res) => blockchain.get()
		.getBlock(req.params.id)
		.then(utils.withDecodedStar)
		.then(utils.withSuccess(res))
		.catch(utils.withNotFound(res))

const post = (req, res) => utils.validate(req.body.body)
		.then(() => blockchain.get().addBlock(new Block(req.body.body)))
		.then(utils.withSuccess(res))
		.catch(utils.withUnprocessedEntity(res))

module.exports = {
	get, 
	post
} 
