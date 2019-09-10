const couchbase = require('couchbase')
const cluster = new couchbase.Cluster('couchbase://' + process.env.BAMS_HOST_DB + '/')
cluster.authenticate(process.env.BAMS_USER, process.env.BAMS_PWD)

exports.cluster = cluster
