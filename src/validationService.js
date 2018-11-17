const bitcoinMessage = require('bitcoinjs-message')

module.exports = (() => {
	const timeStamp = () => (Date.now() / 1000 | 0),
	      validationRequests = {}

	return {
		add: (address) => {
			const now = timeStamp(),
            validationRequest = {
							address,
							requestTimeStamp: now,
							message: address.concat(':').concat(now).concat(':starRegistry'),
							validationWindow: 300
						}
      validationRequests[address] = validationRequest
			return validationRequest
		},
		validate: (address, signature) => {

			const now = timeStamp(),
			      previousRequest = validationRequests[address],
  		      validationWindow = 300 - (now - previousRequest.requestTimeStamp)

			const isValid = bitcoinMessage.verify(previousRequest.message, address, signature)

			return {
				address,
				requestTimeStamp: previousRequest.requestTimeStamp,
				message: previousRequest.message,
				validationWindow: validationWindow,
				messageSignature: isValid ? 'valid' : 'invalid' 
			}
		}
	}
})()
