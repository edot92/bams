const couchbase = require('couchbase')
const mqtt_client = require('../helpers/client')

const cluster = new couchbase.Cluster('couchbase://10.10.42.16/?n1ql_timeout=600.0')
cluster.authenticate(process.env.BAMS_USER, process.env.BAMS_PWD)

const bucket = cluster.openBucket('bbta3_bams_suramadu_test')
const N1qlQuery = couchbase.N1qlQuery

const openBucket = (query, uid) => {
    const req = bucket.query(
        N1qlQuery.fromString(query)
    )

    // req.on('error', err => {
    //     console.log(err)
    // })

    req.on('row', row => {
        mqtt_client.publish(`BAMS/query/${uid}`, JSON.stringify(row), {qos: 1})
    })

    req.on('end', meta => {
        console.log("Durasi:", meta.metrics.elapsedTime)
    })
}

module.exports = openBucket