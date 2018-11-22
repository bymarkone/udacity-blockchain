process.env.DATADIR = './testdata'

const chai = require('chai'),
      chaiHttp = require('chai-http'),
      should = chai.should(),
      server = require('../src/app'),
      repo = require('../src/repository.js') 

chai.use(chaiHttp)

describe('Blocks', () => {

  after(async () => {
    await repo.deleteAll()
  })

  describe('/GET block', () => {
    it('should have an endpoint to GET blocks', (done) => {
      chai.request(server)
        .get('/block/0')
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

    it('should get block by id', (done) => {
       chai.request(server)
        .get('/block/0')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.body.should.equal('First block in the chain - Genesis block')
          done()
        })
    })

    it('returns not found when block is not present', (done) => {
      chai.request(server)
        .get('/block/17')
        .end((err, res) => {
          res.should.have.status(404)   
          done()
        })
    })
  })

  describe('/POST block', () => {
    it('returns 422 when payload is invalid', (done) => {
      chai.request(server)
        .post('/block')
        .send('')
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })
  })
})
