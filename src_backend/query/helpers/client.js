const mqtt = require('mqtt')
const client  = mqtt.connect("mqtt://10.10.42.17:9621/mqtt", {
    username: process.env.BAMS_USER,
    password: process.env.BAMS_PWD
})

module.exports = client