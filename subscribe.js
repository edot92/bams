const MQTT = require("async-mqtt")

const client = MQTT.connect("mqtt://bbta3.bppt.go.id:9621", {
    username: process.env.MQ_USER,
    password: process.env.MQ_PWD
})

const n = 8  // pisah setiap 8 karakter
const onMessage = async (topic) => {
    try {
        await client.subscribe("BAMS")
        if (topic.payload) {
            const node = topic.payload.toString().slice(0, 3)
            const timestamp = parseInt(topic.payload.toString().slice(3, 11), 16) * 1000
            const raw_sensor = topic.payload.toString().slice(11, topic.payload.toString().length)
            let sensor = []

            for (let index = 11; index <= raw_sensor.length + n; index += n) {
                sensor.push(Buffer.from(topic.payload.toString().slice(index, index + n),'hex').readFloatBE(0))
            }

            console.log(node, timestamp, sensor.length, '\n')
        }
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

client.on("packetreceive", onMessage)
