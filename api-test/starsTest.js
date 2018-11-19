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

  after(async () => {
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
					requester.close()
				},
				done
			).catch(console.log)
		})
	})
})
