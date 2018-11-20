const level = require('level'),
      dir = process.env.DATADIR || './chaindata'
      db = level(dir)

const doCount = () => new Promise(resolve => {
		let height = 0
		db.createReadStream()
			.on('data', () => height++)
			.on('close', () => resolve(height))
	})

const lookup = (properties, value) => new Promise((resolve, reject)=> {
	  const results = []
		const flatten = (obj, props) => {
			if (props.length === 1) return obj[props[0]]
			else return flatten(obj[props[0]], props.slice(1))
		}
		db.createReadStream()
			.on('data', (data) => {
				data = JSON.parse(data.value)
				if (flatten(data, properties) === value)	
					results.push(data)	
			})
			.on('error', reject) 
			.on('close', () => resolve(results))
	})

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
  deleteAll,
	lookup
}
