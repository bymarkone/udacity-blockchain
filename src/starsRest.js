const blockchain = require('./blockchain'),
			utils = require('./utils'),
			pipe = require('pipe-functions'),
			validationService = require('./validationService'),
      { Block } = require('./block')

const post = (req, res) => pipe(
		() => utils.validate(req.body.address),
		() => utils.validate(req.body.star),
		() => utils.validate(validationService.isValid(req.body.address), '401'),
		() => { 
			const body = req.body 
			const starStory = { decodedStory: body.star.story, story: Buffer(body.star.story).toString('hex') }
			const star = { ...body.star, ...starStory }
			return { ...body, star }
		},
		(object) => blockchain.get().addBlock(new Block(object)),
		utils.withSuccess(res),
		() => validationService.remove(req.body.address)
	)
	.catch((err) => {
		if (err.message === '422') utils.withUnprocessedEntity(res)()
		if (err.message === '401') utils.withUnauthorized(res)()
	})

module.exports = {
	post
}
