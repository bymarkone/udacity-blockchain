const blockchain = require('./blockchain'),
			utils = require('./utils'),
			pipe = require('pipe-functions'),
			validationService = require('./validationService'),
      { Block } = require('./block')

const post = (req, res) => pipe(
		() => utils.validate(req.body.address),
		() => utils.validate(req.body.star),
		() => utils.validate(validationService.isValid(req.body.address), '401'),
		() => blockchain.get().addBlock(new Block(req.body)),
		utils.withSuccess(res)
	)
	.catch((err) => {
		if (err.message === '422') utils.withUnprocessedEntity(res)()
		if (err.message === '401') utils.withUnauthorized(res)()
	})

module.exports = {
	post
}
