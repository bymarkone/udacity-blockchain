const requireValidation = (requester) => () => requester
		.post('/requestValidation')
		.send({ address: '142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ'})

const validateSignature = (requester) => () => requester,
		.post('/message-signature/validate')
		.send({
			address: '142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ',
			signature: 'H6ZrGrF0Y4rMGBMRT2+hHWGbThTIyhBS0dNKQRov9Yg6GgXcHxtO9GJN4nwD2yNXpnXHTWU9i+qdw5vpsooryLU='
			})

module.exports = {
	requireValidation,
	validateSignature
}
	
