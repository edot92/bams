const mqtt = require('mqtt')
const client  = mqtt.connect("ws://bbta3.bppt.go.id:9623/mqtt", {
    username: process.env.BAMS_USER,
    password: process.env.BAMS_PWD
})

module.exports = client