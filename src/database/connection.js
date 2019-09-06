const couchbase = require('couchbase')
const cluster = new couchbase.Cluster('couchbase://' + process.env.BAMS_HOST + '/')
cluster.authenticate(process.env.BAMS_USER, process.env.BAMS_PWD)

exports.cluster = cluster
