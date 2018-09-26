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
          console.log(res.body)
          done()
        })
     
    })
  })
})
