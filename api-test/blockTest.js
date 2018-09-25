const chai = require('chai'),
      chaiHttp = require('chai-http'),
      should = chai.should(),
      server = require('../src/app')

chai.use(chaiHttp)

describe('Blocks', () => {
  describe('/GET block', () => {
    it('should GET all the blocks', (done) => {
      chai.request(server)
        .get('/block')
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
})
