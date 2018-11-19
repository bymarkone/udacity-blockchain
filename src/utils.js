const withSuccess = (res) => (result) => res.send(result)
const withNotFound = (res) => (result) => res.sendStatus(404)
const withUnprocessedEntity = (res) => () => res.sendStatus(422)
const withUnauthorized = (res) => () => res.sendStatus(401)
const validate = async (object, message='422') => { 
	if (!object) throw new Error(message)
}

module.exports = {
	withSuccess,
	withNotFound,
	withUnprocessedEntity,
	withUnauthorized,
	validate
}
