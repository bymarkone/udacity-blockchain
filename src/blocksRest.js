const { Blockchain } = require('./blockchain'),
      { Block } = require('./block'),
			utils = require('./utils')

const blockchain = (() => {
  let instance = () => {}
  new Blockchain().then(result => instance = result)
  return {
    get: () => instance
  }
})()

const get = (req, res) => blockchain.get()
		.getBlock(req.params.id)
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
