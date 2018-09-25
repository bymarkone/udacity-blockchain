const level = require('level'),
      dir = process.env.DATADIR || './chaindata'
      db = level(dir)

const put = async (key, value) => await db.put(key, value)
const get = async (key) => await db.get(key)
const putJson = async (key, value) => await db.put(key, JSON.stringify(value))
const getJson = async (key) => JSON.parse(await db.get(key))

module.exports = {
  put,
  get,
  putJson,
  getJson
}
