const chai = require('chai'),
			should = chai.should(),
			utils = require('../src/utils'),
			utf8 = require('utf8')

describe('Utils test', () => {
	it('Validates only ASCII characters', async () => {
		let result1 = await utils.validateASCII('Normal ASCII 98$$%')
		result1.should.be.equal(true)
		let result2 = await utils.validateASCII(utf8.encode('UTF 8 charaters \xA9'))
		result2.should.be.equal(false)
	})
	it('Validates words count', async () => {
		let result1 = await utils.validateWordsCount('It should count no more then X words', 10)
		result1.should.be.equal(true)
		let result2 = await utils.validateWordsCount('It should count more than X words', 5)
		result2.should.be.equal(false)
	})
	it('Validates bytes', async () => {
		let result1 = await utils.validateBytes('This is a small text', 50)
		result1.should.be.equal(true)
		let result2 = await utils.validateBytes('This is a very very very very very very big big text ')
		result2.should.be.equal(false)
	})
})

