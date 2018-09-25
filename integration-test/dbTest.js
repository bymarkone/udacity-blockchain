process.env.DATADIR = './testdata'

const chai = require('chai'),
      chaiAsPromised = require('chai-as-promised'),
      should = chai.should(),
      repo = require('../src/repository')

chai.use(chaiAsPromised)

describe('Repository tests', () =>  { 
    
  afterEach(async () => {
    await repo.deleteAll() 
  })

  describe('Add and retrieve data', () => {
      it('should add string data to repository', async () => {
        await repo.put(1, 'Manfred')
        await repo.put(2, 'Maria')
        const actual1 = repo.get(1)
        const actual2 = repo.get(2)

        actual1.should.eventually.equal('Manfred')
        actual2.should.eventually.equal('Maria')
      })

      it('should add json data to repository', async () => {
        let first = { name: 'John' }
        let second = { name: 'Larry' }

        await repo.putJson(1, first)
        await repo.putJson(2, second)
      
        const actual1 = repo.getJson(1)
        const actual2 = repo.getJson(2)

        actual1.should.eventually.deep.equal(first)
        actual2.should.eventually.deep.equal(second)
      })
  })

  describe('Counts data', () =>  {
    it('Counts all data', async () => {
        await repo.put(1, 'Manfred')
        await repo.put(2, 'Maria')
        await repo.put(3, 'John')
        await repo.put(4, 'Larry')
        await repo.put(5, 'Zigfried')

        let count = repo.count()
        count.should.eventually.be.equal(5)
    })
  })

  describe('Deletes data', () => {
      it('Deletes all data', async () => {
        await repo.put(1, 'Manfred')
        await repo.put(2, 'Maria')

        await repo.deleteAll() 
        let newcount = repo.count()

        return  newcount.should.eventually.be.equal(0)
      })
  })

})
