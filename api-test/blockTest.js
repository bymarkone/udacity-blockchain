const chai = require('chai'),
      chaiHttp = require('chai-http'),
      should = chai.should(),
      server = require('../src/app')

chai.use(chaiHttp)

describe('Blocks', () => {
  describe('/GET block', () => {
    it('should have an endpoint to GET blocks', (done) => {
      chai.request(server)
        .get('/blocks/0')
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

    it('should get block by id', (done) => {
       chai.request(server)
        .get('/blocks/0')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.body.should.equal('First block in the chain - Genesis block')
          done()
        })
     
    })
  })

  describe('/POST block', () => {
    it ('post payload to blockchain', (done) => {
      chai.request(server)
        .post('/blocks')
        .send({ payload: 'This is a payload for a block'})
        .end((err, res) => {
          res.should.have.status(200)
          res.body.body.should.equal('This is a payload for a block')
          done()
        })
    })

    it('returns 402 when payload is invalid', (done) => {
      chai.request(server)
        .post('/blocks')
        .send('')
        .end((err, res) => {
          res.should.have.status(422)
          done()
        })
    })
  })
})
