const mqtt = require('mqtt')
const client  = mqtt.connect("ws://103.224.137.103:9623/mqtt", {
    username: process.env.BAMS_USER,
    password: process.env.BAMS_PWD
})

module.exports = client