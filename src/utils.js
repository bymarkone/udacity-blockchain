const withSuccess = (res) => (result) => res.send(result)
const withNotFound = (res) => (result) => res.sendStatus(404)
const withUnprocessedEntity = (res) => () => res.sendStatus(422)
const withUnauthorized = (res) => () => res.sendStatus(401)
const validate = async (object, message='422') => { 
	if (!object) throw new Error(message)
}
const validateASCII = async (str) => {if (!/^[\x00-\x7F]*$/.test(str)) throw new Error('ascii'); else true}
const validateWordsCount = async (str, count) => {if (!(str.split(' ').length <= count)) throw new Error('words'); else true}
const validateBytes = async (str, size) => {if (!(Buffer.byteLength(str, 'ascii') < size)) throw new Error('b'); else true}

const withDecodedStar = (node) => {
	if (!(node && node.body && node.body.star)) return node
	node.body.star.decodedStory = Buffer(node.body.star.story, 'hex').toString('ascii')
	return node
}

module.exports = {
	withSuccess,
	withNotFound,
	withUnprocessedEntity,
	withUnauthorized,
	validate,
	validateASCII,
	validateWordsCount,
	validateBytes,
	withDecodedStar
}
