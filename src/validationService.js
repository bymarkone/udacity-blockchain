const bitcoinMessage = require('bitcoinjs-message')

module.exports = (() => {
	const now = () => (Date.now() / 1000 | 0),
				isExpired = (vr) => (now() - vr.requestTimeStamp) > 300,
				updateWindow = (timeStamp) => 300 - (now() - timeStamp),
				updateValidationRequest = (validationRequest) => {
					if (!validationRequest) return
					const validationWindow = { validationWindow: updateWindow(validationRequest.requestTimeStamp) }
					if (validationWindow.validationWindow <= 0) return 
					return { ...validationRequest, ...validationWindow }
				},
	      validationRequests = {}

	return {
		add: (address) => {
			const timeNow = now(),
						validationRequest = updateValidationRequest(validationRequests[address]) ||
							{
								address,
								requestTimeStamp: timeNow,
								message: address.concat(':').concat(timeNow).concat(':starRegistry'),
								validationWindow: 300
							}

      validationRequests[address] = validationRequest
			return validationRequest
		},
		validate: (address, signature) => {
			const timeNow = now(),
			      previousRequest = validationRequests[address],
  		      validationWindow = 300 - (timeNow - previousRequest.requestTimeStamp)

			const isValid = bitcoinMessage.verify(previousRequest.message, address, signature)
			const updatedRequest = {
				address,
				requestTimeStamp: previousRequest.requestTimeStamp,
				message: previousRequest.message,
				validationWindow: validationWindow,
				messageSignature: isValid
			}
			validationRequests[address] = updatedRequest
			return updatedRequest
		},
		isValid: (address) => {
			const thereIsARequest = !!validationRequests[address]
			if (!thereIsARequest) return false

			const requestIsNotExpired = !isExpired(validationRequests[address]),
						signatureIsValid = !!validationRequests[address].messageSignature

			return thereIsARequest && requestIsNotExpired && signatureIsValid
		},
		remove: (address) => delete validationRequests[address] 
	}
})()
