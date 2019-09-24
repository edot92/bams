const MQTT = require("async-mqtt")
const conn = require("./src/database/connection")
const db = require("./src/database")
const d2c = require("./src/helpers/deg2compas")
const grup = require("./src/helpers/grup_kecepatan")

const bucket = conn.cluster.openBucket("bbta3_bams_suramadu_test")

const client = MQTT.connect("mqtt://" + process.env.BAMS_HOST_MQTT + ":9621", {
    username: process.env.BAMS_USER,
    password: process.env.BAMS_PWD
})

const n = 8  // pisah setiap 8 karakter
let waktu_ms = 0  // satuan milli second
const onMessage = async (topic) => {
    try {
        await client.subscribe("BAMS")

        if (topic.payload) {
            const node = topic.payload.toString().slice(0, 3)
            const timestamp = parseInt(topic.payload.toString().slice(3, 11), 16) * 1000
            const raw_sensor = topic.payload.toString().slice(11, topic.payload.toString().length)

            let acc1 = []
            let acc2 = []
            let acc3 = []
            let ane1 = null
            let ane2 = null
            let ane3 = null

            for (let index = 11; index <= raw_sensor.length + n; index += n) {
                const sensor_item_raw = topic.payload.toString().slice(index, index + n)
                const sensor_item = Buffer.from(sensor_item_raw, 'hex').readFloatBE(0)

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
            }

            let payload = null

            for (let i = 0; i < 100; i++) {
                payload = {
                    "ts": timestamp + waktu_ms,
                    "node": node,
                    "acc1": acc1.length > 0 ? acc1[i] : null,
                    "acc2": acc2.length > 0 ? acc2[i] : null,
                    "acc3": node == "sb2" && acc3.length > 0 ? acc3[i] : null,
                    "arah": ane2,
                    "grup_kec": grup.grup_kecepatan(ane1),
                    "kecepatan": ane1,
                    "kompas": ane2 ? d2c.toCompas(ane2) : null,
                    "sudut_serang": ane3,
                }

                // db.insertSensor(bucket, payload)
                console.log(payload)
                waktu_ms += 10  // dalam satuan ms, 1 s ada 100 data getaran
            }
        }
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

client.on("packetreceive", onMessage)
