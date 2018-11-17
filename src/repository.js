const level = require('level'),
      dir = process.env.DATADIR || './chaindata'
      db = level(dir)

const doCount = () => {
    return new Promise(resolve => {
      let height = 0
      db.createReadStream()
        .on('data', () => height++)
        .on('close', () => resolve(height))
    })
}

const doDeleteAll = async () => {
        let batch = []
        await new Promise(resolve => {
          db.createKeyStream()
            .on('data', key => { if (key > 0) batch.push({ type: 'del', key: key }) })
            .on('close', resolve) })
        return db.batch(batch)  
      }

const put = (key, value) => db.put(key, value)
const get = (key) => db.get(key)
const putJson = (key, value) => db.put(key, JSON.stringify(value))
const getJson = async (key) => JSON.parse(await db.get(key))
const count = doCount
const deleteAll = doDeleteAll

module.exports = {
  put,
  get,
  putJson,
  getJson,
  count,
  deleteAll
}
