
const address = '__142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ'
const signature  = 'H6ZrGrF0Y4rMGBMRT2+hHWGbThTIyhBS0dNKQRov9Yg6GgXcHxtO9GJN4nwD2yNXpnXHTWU9i+qdw5vpsooryLU='

const star = {
	"dec": "68° 52' 56.9",
	"ra": "16h 29m 1.0s",
	"story": "Found star using https://www.google.com/sky/"
}

const requireValidation = (requester) => () => requester
		.post('/requestValidation')
		.send({ address })

const validateSignature = (requester) => () => requester
		.post('/message-signature/validate')
		.send({ address, signature })

module.exports = {
	star,
	address,
	signature,
	requireValidation,
	validateSignature
}
	
