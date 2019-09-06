const MQTT = require("async-mqtt")

const client = MQTT.connect("mqtt://bbta3.bppt.go.id:9621", {
    username: process.env.MQ_USER,
    password: process.env.MQ_PWD
})

const onMessage = async (topic) => {
    try {
        await client.subscribe("BAMS")
        if (topic.payload) {
            const node = topic.payload.toString().slice(0, 3)
            const timestamp = parseInt(topic.payload.toString().slice(3, 11), 16) * 1000
            console.log(node, timestamp)
        }
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

client.on("packetreceive", onMessage)
