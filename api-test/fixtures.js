const address = '1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN',
			bitcoin = require('bitcoinjs-lib'),
			bitcoinMessage = require('bitcoinjs-message'),
			keyPair = bitcoin.ECPair.fromWIF('5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299sBCnWjss')

const sign = (message) => bitcoinMessage.sign(message, keyPair.privateKey, keyPair.compressed)

const star = {
	"dec": "68° 52' 56.9",
	"ra": "16h 29m 1.0s",
	"story": "Found star using https://www.google.com/sky/"
}

const requireValidation = (requester) => (res) => requester
		.post('/requestValidation')
		.send({ address })

const validateSignature = (requester) => (res) => requester
		.post('/message-signature/validate')
		.send({ address, signature: sign(res.body.message) })

module.exports = {
	sign,
	star,
	address,
	requireValidation,
	validateSignature
}

