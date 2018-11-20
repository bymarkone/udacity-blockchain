process.env.DATADIR = './testdata'

const chai = require('chai'),
			chaiHttp = require('chai-http'),
			should = chai.should(),
			pipe = require('pipe-functions'),
			server = require('../src/app'),
			fixtures = require('./fixtures'),
      repo = require('../src/repository.js') 

chai.use(chaiHttp)

describe('Stars' , () => {

  afterEach(async () => {
    await repo.deleteAll()
  })

	describe('/POST star', () => {		

		it('is not authorized to post a start without validation', (done) => {
			const requester = chai.request(server).keepOpen()

			pipe(
				(res) => requester
						.post('/stars')
						.send({
							address: fixtures.address,
							star: fixtures.star
						}),
				(res) => {
			 		res.should.have.status(401)		
					requester.close()
				},
				done
			).catch(console.log)

		})

		it('post a star for a given user', (done) => {
			const requester = chai.request(server).keepOpen()
		
			pipe(
				fixtures.requireValidation(requester),
				fixtures.validateSignature(requester),
				(res) => requester
						.post('/stars')
						.send({
							address: fixtures.address,
							star: fixtures.star
						}),
				(res) => {
			 		res.should.have.status(200)		
					res.body.body.address.should.equal(fixtures.address)
					res.body.body.star.story.should.equal(Buffer(fixtures.star.story).toString('hex'))

					requester.close()
				},
				done
			).catch(console.log)
		})

		it('post ONLY one a star for a validation request', (done) => {
			const requester = chai.request(server).keepOpen()
		
			pipe(
				fixtures.requireValidation(requester),
				fixtures.validateSignature(requester),
				(res) => requester
						.post('/stars')
						.send({
							address: fixtures.address,
							star: fixtures.star
						}),
				(res) => requester
						.post('/stars')
						.send({
							address: fixtures.address,
							star: fixtures.star
						}),
				(res) => {
			 		res.should.have.status(401)		
					requester.close()
				},
				done
			).catch(console.log)
		})
	})

	describe('/GET star', () => {		
		it('get star by address', (done) => {
			const requester = chai.request(server).keepOpen()

			pipe(
				fixtures.requireValidation(requester),
				fixtures.validateSignature(requester),
				(res) => requester
						.post('/stars')
						.send({
							address: fixtures.address,
							star: fixtures.star
						}),
				(res) => requester
						.get('/stars/address:' + fixtures.address)
						.send(),
				(res) => {
						res.status.should.be.equal(200)	

						requester.close()
				},
				done
			).catch(console.log)
		})


		it('get star by hash', (done) => {
			const requester = chai.request(server).keepOpen()

			pipe(
				fixtures.requireValidation(requester),
				fixtures.validateSignature(requester),
				(res) => requester
						.post('/stars')
						.send({
							address: fixtures.address,
							star: fixtures.star
						}),
				(res) => requester
						.get('/stars/hash:' + res.body.hash)
						.send(),
				(res) => {
						res.status.should.be.equal(200)	
						res.body.body.address.should.equal(fixtures.address)
						requester.close()
				},
				done
			).catch(console.log)
		})
	
	})

})
