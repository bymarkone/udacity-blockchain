const chai = require('chai'),
			should = chai.should(),
			utils = require('../src/utils'),
			utf8 = require('utf8')

describe('Utils test', () => {
	it('Validates only ASCII characters', () => {
		utils.validateASCII('Normal ASCII 98$$%').should.be.equal(true)
		utils.validateASCII(utf8.encode('UTF 8 charaters \xA9')).should.be.equal(false)
	})
	it('Validates words count', () => {
		utils.validateWordsCount('It should count no more then X words', 10).should.be.equal(true)
		utils.validateWordsCount('It should count more than X words', 5).should.be.equal(false)
	})
	it('Validates bytes', () => {
		utils.validateBytes('This is a small text', 50).should.be.equal(true)
		utils.validateBytes('This is a very very very very very very big big text ').should.be.equal(false)
	})
})

