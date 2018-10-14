const chai = require('chai'),
      chaiHttp = require('chai-http'),
      should = chai.should(),
      server = require('../src/app')

chai.use(chaiHttp)

describe('User', () => {
  describe('/POST request validation', () => {
    it ('returns validation object', (done) => {
      chai.request(server)
        .post('/requestValidation')
        .send({ address: '__142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ'})
        .end((err, res) => {
          res.should.have.status(200)
          res.body.address.should.equal('__142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ')
          res.body.requestTimeStamp.should.not.be.an('undefined')
          const timestamp = res.body.requestTimeStamp
          res.body.message.should.equal('__142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ:'+timestamp+':starRegistry')
          res.body.validationWindow.should.equal(300)
          done()
        })
    })

    it('returns 422 when address in not valid', (done) => {
      chai.request(server)
        .post('/requestValidation')
        .send({ address: '' })
        .end((err, res) => {
          res.should.have.status(422) 
        })
        done()
    })
  })
  
  describe('/POST validate signature', () => {
    it('validates message signature', (done) => {
      const requester = chai.request(server).keepOpen()
      
      requester
        .post('/requestValidation')
        .send({ address: '142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ'})
        .end((err, res) => {
  
          for(let i=0; i < 2000000000; i++) i * 17
         
          requester
            .post('/message-signature/validate')
            .send({
              address: '142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ',
              signature: 'H6ZrGrF0Y4rMGBMRT2+hHWGbThTIyhBS0dNKQRov9Yg6GgXcHxtO9GJN4nwD2yNXpnXHTWU9i+qdw5vpsooryLU='
            })
            .end((err, res) => {
              res.should.have.status(200)
              res.body.registerStar.should.equal(true)
              const status = res.body.status
              status.address.should.equal('142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ')
              status.requestTimeStamp.should.not.be.an('undefined')
              status.message.should.not.be.an('undefined')
              status.messageSignature.should.equal('valid')

              requester.close()
              done()
            })
        })
    })
  })
})
