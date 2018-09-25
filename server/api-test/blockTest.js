const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

const server = require('../src/app')

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
