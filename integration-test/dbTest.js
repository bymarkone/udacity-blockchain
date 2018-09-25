process.env.DATADIR = './testdata'

const chai = require('chai'),
      should = chai.should(),
      repo = require('../src/repository')

describe('Repository tests', () =>  { 
    
  afterEach(async () => {
    await  repo.deleteAll() 
  })

  describe('Add and retrieve data', () => {
      it('should add string data to repository', async () => {
        await repo.put(1, 'Manfred')
        await repo.put(2, 'Maria')
        const actual1 = await repo.get(1)
        const actual2 = await repo.get(2)

        actual1.should.equal('Manfred')
        actual2.should.equal('Maria')
      })

      it('should add json data to repository', async () => {
        let first = { name: 'John' }
        let second = { name: 'Larry' }

        await repo.putJson(1, first)
        await repo.putJson(2, second)
      
        const actual1 = await repo.getJson(1)
        const actual2 = await repo.getJson(2)

        actual1.should.deep.equal(first)
        actual2.should.deep.equal(second)
      })
  })

  describe('Counts data', () =>  {
    it('Counts all data', async () => {
        await repo.put(1, 'Manfred')
        await repo.put(2, 'Maria')
        await repo.put(3, 'John')
        await repo.put(4, 'Larry')
        await repo.put(5, 'Zigfried')

        let count = await repo.count()
        count.should.be.equal(5)
    })
  })

  describe('Deletes data', () => {
      it('Deletes all data', async () => {
        await repo.put(1, 'Manfred')
        await repo.put(2, 'Maria')

        await repo.deleteAll() 
        let newcount = await repo.count()

        newcount.should.be.equal(0)
      })
  })

})
