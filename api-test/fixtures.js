
const address = '__142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ'
const signature  = 'H6ZrGrF0Y4rMGBMRT2+hHWGbThTIyhBS0dNKQRov9Yg6GgXcHxtO9GJN4nwD2yNXpnXHTWU9i+qdw5vpsooryLU='

const requireValidation = (requester) => () => requester
		.post('/requestValidation')
		.send({ address })

const validateSignature = (requester) => () => requester
		.post('/message-signature/validate')
		.send({ address, signature })

module.exports = {
	address,
	signature,
	requireValidation,
	validateSignature
}
	
