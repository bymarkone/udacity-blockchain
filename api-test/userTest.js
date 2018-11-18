process.env.DATADIR = './testdata'

const chai = require('chai'),
      chaiHttp = require('chai-http'),
      should = chai.should(),
			pipe = require('pipe-functions'),
      server = require('../src/app'),
			fixtures = require('./fixtures')

chai.use(chaiHttp)

describe('User', () => {
  describe('/POST request validation', () => {
    it ('returns validation object', (done) => {
      chai.request(server)
        .post('/requestValidation')
        .send({ address: fixtures.address }) 
        .end((err, res) => {
          res.should.have.status(200)
          res.body.address.should.equal(fixtures.address)
          res.body.requestTimeStamp.should.not.be.an('undefined')
          const timestamp = res.body.requestTimeStamp
          res.body.message.should.equal(fixtures.address+':'+timestamp+':starRegistry')
          res.body.validationWindow.should.equal(300)
					done()
        })
    })

    it('returns 422 when address in not valid', (done) => {
      chai.request(server)
        .post('/requestValidation')
        .send({ other: '' })
        .end((err, res) => {
          res.should.have.status(422) 
					done()
        })
    })
  })
  
  describe('/POST validate signature', () => {
    it('validates message signature', (done) => {
      const requester = chai.request(server).keepOpen()
    	
			pipe(
				fixtures.requireValidation(requester),
				fixtures.validateSignature(requester),
				(res) => {
					res.should.have.status(200)
					res.body.registerStar.should.equal(true)
					const status = res.body.status
					status.address.should.equal(fixtures.address)
					status.requestTimeStamp.should.not.be.an('undefined')
					status.message.should.not.be.an('undefined')
					status.messageSignature.should.equal(true)

					requester.close()
					done()
				}
			).catch(console.log)

    })
  })
})
