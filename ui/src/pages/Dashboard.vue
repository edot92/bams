<template>
  <q-page padding id="dashboard">
    <div class="column">
      <div class="col self-end">
        <div class="row">
          <div class="col-4">
            <q-list dark>
              <q-item-label header class="text-center text-blue-grey-3">sb6</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Akselerometer y</q-item-label>
                  <q-item-label class="text-h6">
                    {{sensor.sb6_acc1}} G
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Akselerometer z</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb6_acc2}} G</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-4">
            <q-list dark>
              <q-item-label header class="text-center text-blue-grey-3">sb2</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Akselerometer x</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb2_acc1}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Akselerometer y</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb2_acc2}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Akselerometer z</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb2_acc3}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Kec angin</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb2_ane1}} m/s</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Arah angin</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb2_ane2}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-4">
            <q-list dark>
              <q-item-label header class="text-center text-blue-grey-3">sb4</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Akselerometer y</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb4_acc1}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Akselerometer z</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb4_acc2}} G</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>

      <div class="col self-start">
        <div class="row">
          <div class="col-4">
            <q-list dark>
              <q-item-label header class="text-center text-blue-grey-3">sb5</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Akselerometer y</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb5_acc1}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Akselerometer z</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb5_acc2}} G</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-4">
            <q-list dark>
              <q-item-label header class="text-center text-blue-grey-3">sb1</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Akselerometer y</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb1_acc1}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Akselerometer z</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb1_acc2}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Kec angin</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb1_ane1}} m/s</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Arah angin</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb1_ane2}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-4">
            <q-list dark>
              <q-item-label header class="text-center text-blue-grey-3">sb3</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Akselerometer y</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb3_acc1}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-warning">Akselerometer z</q-item-label>
                  <q-item-label class="text-h6">{{sensor.sb3_acc2}} G</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import MQTT from "async-mqtt"
import {processData} from '../controllers/dashboard'

export default {
  name: "HalamanDashboard",
  data() {
    return {
      mqtt: MQTT.connect("ws://bbta3.bppt.go.id:9623/mqtt", {
        username: process.env.BAMS_USER,
        password: process.env.BAMS_PWD,
        keepalive: 1000
      }),
      sensor: this.$store.getters['node/nodeGetter']
    }
  },
  created() {
    this.cobaMQTT()
  },
  destroyed() {
    this.mqtt.end()
  },
  methods: {
    cobaMQTT() {
      this.mqtt.on('connect', async (connact) => {
        try {
          await this.mqtt.subscribe("BAMS/dashboard")
        } catch (e){
          console.log(e.stack)
        }
      })

      this.mqtt.on("message", async (topic, message, packet) => {
        try {
          const string_sensor = new TextDecoder("utf-8").decode(message)
          const json_sensor = JSON.parse(string_sensor)

          processData(json_sensor, this.$store)
        } catch (error) {
          console.log(error.message)
          this.mqtt.end()
        }
      })
    }
  }
};
</script>

<style lang="stylus">
@import '../css/quasar.variables'

#dashboard {
  background-image: url('~assets/suramadu.jpg');
  background-size: cover;
}

.q-separator {
  background-color $low
}
</style>
