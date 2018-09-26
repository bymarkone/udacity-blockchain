process.env.DATADIR = './testdata'

const chai = require('chai'),
      chaiAsPromised = require('chai-as-promised'),
      should = chai.should(),
      { Blockchain } = require('../src/blockchain'),
      repo = require('../src/repository')

chai.use(chaiAsPromised)

describe('Blockchain integration tests', () => {
  
  describe('Blockchain initialization', () => {
    it('Starts blockchain with Genesis block', async () => {
      await repo.deleteAll()
          
      const blockchain = await new Blockchain()
      const currentHeight = blockchain.getBlockHeight()
  
      return currentHeight.should.eventually.equal(0)
    })
  })
})
