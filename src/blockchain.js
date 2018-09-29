const repo = require('./repository')
const SHA256 = require('crypto-js/sha256')
const { Block } = require('./block')

class Blockchain {
  constructor() {
    return (async () => {
      let height = await this.getBlockHeight()
      if (height < 0) 
        await this.addBlock(new Block("First block in the chain - Genesis block"))
      return this
    })()
  }

  async addBlock(newBlock) {
    const currentHeight = await this.getBlockHeight()
    const previousBlock = await this.getBlock(currentHeight)
    
    newBlock.height = currentHeight + 1
    newBlock.time = new Date().getTime().toString().slice(0, -3)
    newBlock.previousBlockHash = previousBlock ? previousBlock.hash : ''
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString()

    await repo.putJson(newBlock.height, newBlock)
    return newBlock
  }

  async getBlockHeight() {
    const total = await repo.count()
    return total - 1
  }

  getBlock(blockHeight) {
    return repo.getJson(blockHeight)
  }

  async validateBlock(blockHeight) {
    const block = await this.getBlock(blockHeight)
    const blockHash = block.hash
    block.hash = '' 
    const validBlockHash = SHA256(JSON.stringify(block)).toString()
    return blockHash === validBlockHash
  }

  async validateChain() {
    let errorLog = []

    const currentHeight = await this.getBlockHeight()
    for (let i = 0; i < currentHeight - 1; i++) {
      if (await !this.validateBlock(i)) errorLog.push(i)
  
      const block = await this.getBlock(i)
      block.hash = ''
      const validBlockHash = SHA256(JSON.stringify(block)).toString()
      const nextBlock = await this.getBlock(i+1)

      if (validBlockHash !== nextBlock.previousBlockHash) errorLog.push(i)
    }

    return errorLog
  }
    
}

module.exports = {
  Blockchain: Blockchain
}
