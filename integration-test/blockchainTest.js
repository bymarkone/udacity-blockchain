process.env.DATADIR = './testdata'

const chai = require('chai'),
      chaiAsPromised = require('chai-as-promised'),
      should = chai.should(),
      { Blockchain } = require('../src/blockchain'),
      { Block } = require('../src/block')
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

    it('Genesis block has specific data and no reference to previous', async() => {
      await repo.deleteAll()
      const blockchain = await new Blockchain()
      const genesis = await blockchain.getBlock(0)

      const expectedData = 'First block in the chain - Genesis block'

      genesis.body.should.equal(expectedData)
      genesis.previousBlockHash.should.equal('')

    })
  })

  describe('Add blocks', () => {
    it('Adds 10 new blocks to the chain', async () => {
      await repo.deleteAll()
      const blockchain = await new Blockchain()
    
      for (let i = 0; i < 10; i++) {
        await blockchain.addBlock(new Block("test data" + i))
      }
      
      const height = await blockchain.getBlockHeight()
      
      height.should.equal(10)
    })

    it('Block contains hash of previous block', async () => {
      const blockchain = await new Blockchain()
      
      await blockchain.addBlock(new Block("previous block"))
      const previous = await blockchain.getBlock(await blockchain.getBlockHeight())

      await blockchain.addBlock(new Block("current block"))
      const current = await blockchain.getBlock(await blockchain.getBlockHeight())

      current.previousBlockHash.should.equal(previous.hash)
    })
  })

  describe('Validates blockchain', () => {
    it('Validades integrity of block hash', async () => {
      const blockchain = await new Blockchain()

      await blockchain.addBlock(new Block("current block"))
      const currentHeight = await blockchain.getBlockHeight()

      const valid = await blockchain.validateBlock(currentHeight)
      valid.should.be.true
    })

    it('Fails validationg when previous hash is changed', async () => {
      const blockchain = await new Blockchain()

      await blockchain.addBlock(new Block("current block"))
      const currentHeight = await blockchain.getBlockHeight()
      const lastBlock = await blockchain.getBlock(currentHeight)

      lastBlock.previousBlockHash = 'an invalid hash' 
      await repo.putJson(currentHeight, lastBlock)

      const valid = await blockchain.validateBlock(currentHeight)
      valid.should.be.false

    })
  })
})
