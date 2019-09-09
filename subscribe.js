const MQTT = require("async-mqtt")
const conn = require("./src/database/connection")
const db = require("./src/database")

const bucket = conn.cluster.openBucket("bbta3_bams_suramadu_test")

const client = MQTT.connect("mqtt://bbta3.bppt.go.id:9621", {
    username: process.env.BAMS_USER,
    password: process.env.BAMS_PWD
})

const n = 8  // pisah setiap 8 karakter
const waktu_ms = 0  // satuan milli second
const onMessage = async (topic) => {
    try {
        await client.subscribe("BAMS")
        if (topic.payload) {
            const node = topic.payload.toString().slice(0, 3)
            const timestamp = parseInt(topic.payload.toString().slice(3, 11), 16) * 1000
            const raw_sensor = topic.payload.toString().slice(11, topic.payload.toString().length)

            let sensor = []
            let acc1 = []
            let acc2 = []
            let acc3 = []
            let ane1 = 0
            let ane2 = 0
            let ane3 = 0

            for (let index = 11; index <= raw_sensor.length + n; index += n) {
                const sensor_item_raw = topic.payload.toString().slice(index, index + n)
                const sensor_item = Buffer.from(sensor_item_raw, 'hex').readFloatBE(0)

                sensor.push(sensor_item)

                if (node == "sb2") {
                    if (index >= 11 && index <= 803) {
                        acc1.push(sensor_item)
                    } else if (index >= 811 && index <= 1603) {
                        acc2.push(sensor_item)
                    } else if (index >= 1611 && index <= 2403) {
                        acc3.push(sensor_item)
                    } else if (index == 2411) {
                        ane1 = sensor_item
                    } else if (index == 2419) {
                        ane2 = sensor_item
                    } else if (index == 2427) {
                        ane3 = sensor_item
                    }
                } else if (node == "sb1") {
                    if (index >= 11 && index <= 803) {
                        acc1.push(sensor_item)
                    } else if (index >= 811 && index <= 1603) {
                        acc2.push(sensor_item)
                    } else if (index == 1611) {
                        ane1 = sensor_item
                    } else if (index == 1619) {
                        ane2 = sensor_item
                    } else if (index == 1627) {
                        ane3 = sensor_item
                    }
                } else {
                    if (index >= 11 && index <= 803) {
                        acc1.push(sensor_item)
                    } else if (index >= 811 && index <= 1603) {
                        acc2.push(sensor_item)
                    }
                }

                // let payload = {
                //     "acc1": payload.acc1,
                //     "acc2": payload.acc2,
                //     "acc3": payload.acc3,
                //     "arah": payload.arah,
                //     "grup_kec": payload.grup_kec,
                //     "kecepatan": payload.kecepatan,
                //     "kompas": payload.kompas,
                //     "node": payload.node
                // }

                // db.insertSensor(timestamp + waktu_ms, bucket, payload)
                // waktu_ms += 10  // dalam satuan ms, 1 s ada 100 data getaran
            }
            console.log(sensor)
            console.log(node, timestamp, sensor.length, acc1.length, acc2.length, acc3.length, ane1, ane2, ane3, '\n')
        }
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

client.on("packetreceive", onMessage)
