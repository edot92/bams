const couchbase = require('couchbase')
const mqtt_client = require('../helpers/client')

const cluster = new couchbase.Cluster(`couchbase://${process.env.BAMS_HOST_COUCH}/?n1ql_timeout=600.0`)
cluster.authenticate(process.env.BAMS_USER, process.env.BAMS_PWD)

const N1qlQuery = couchbase.N1qlQuery

const openBucket = (query, uid) => {
    const bucket = cluster.openBucket('bbta3_bams_suramadu_test')
    const req = bucket.query(
        N1qlQuery.fromString(query)
    )

    req.on('error', () => {
        console.log("Something error is happening")
        bucket.disconnect()
    })

    req.on('row', row => {
        mqtt_client.publish(`BAMS/query/${uid}`, JSON.stringify(row))
    })

    req.on('end', meta => {
        console.log("Durasi:", meta.metrics.elapsedTime, "\n")
        bucket.disconnect()
    })
}

module.exports = openBucket