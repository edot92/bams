import MQTT from "mqtt"

// "async" is optional
export default async ({ Vue }) => {
  Vue.prototype.$mqtt = MQTT.connect("ws://bbta3.bppt.go.id:9623/mqtt", {
    username: process.env.BAMS_USER,
    password: process.env.BAMS_PWD
  })
}
