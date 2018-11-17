const withSuccess = (res) => (result) => res.send(result)
const withNotFound = (res) => (result) => res.sendStatus(404)
const withUnprocessedEntity = (res) => (err) => { console.log(err); return res.sendStatus(422) }
const validate = async (object) => { if (!object) throw new Error() } 

module.exports = {
	withSuccess,
	withNotFound,
	withUnprocessedEntity,
	validate
}
