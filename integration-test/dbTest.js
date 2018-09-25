process
const chai = require('chai'),
      should = chai.should(),
      repo = require('../src/repository')

describe('Repository tests', () =>  { 
  describe('Add data', () => {
      it('should add data to repository', async () => {
        await repo.put(1, 'Manfred')
        const actual = await repo.get(1)

        actual.should.equal('Manfred')
      })
  })
})
