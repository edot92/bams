<template>
  <q-page padding id="dashboard">
    <div class="column">
      <div class="col self-end">
        <div class="row">
          <div class="col-4">
            <q-list dark>
              <q-item-label header>sb6</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer x</q-item-label>
                  <q-item-label caption>
                    {{sensor.sb6_acc1}} G
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer y</q-item-label>
                  <q-item-label caption>{{sensor.sb6_acc2}} G</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-4">
            <q-list dark>
              <q-item-label header>sb2</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer x</q-item-label>
                  <q-item-label caption>{{sensor.sb2_acc1}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer y</q-item-label>
                  <q-item-label caption>{{sensor.sb2_acc2}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer z</q-item-label>
                  <q-item-label caption>{{sensor.sb2_acc3}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Kecepatan angin</q-item-label>
                  <q-item-label caption>{{sensor.sb2_ane1}} m/s</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Arah angin</q-item-label>
                  <q-item-label caption>{{sensor.sb2_ane2}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-4">
            <q-list dark>
              <q-item-label header>sb4</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer x</q-item-label>
                  <q-item-label caption>{{sensor.sb4_acc1}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer y</q-item-label>
                  <q-item-label caption>{{sensor.sb4_acc2}} G</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
      <div class="col-8" style="height: 200px"></div>
      <div class="col self-start">
        <div class="row">
          <div class="col-4">
            <q-list dark>
              <q-item-label header>sb5</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer x</q-item-label>
                  <q-item-label caption>{{sensor.sb5_acc1}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer y</q-item-label>
                  <q-item-label caption>{{sensor.sb5_acc2}} G</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-4">
            <q-list dark>
              <q-item-label header>sb1</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer x</q-item-label>
                  <q-item-label caption>{{sensor.sb1_acc1}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer y</q-item-label>
                  <q-item-label caption>{{sensor.sb1_acc3}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Kecepatan angin</q-item-label>
                  <q-item-label caption>{{sensor.sb1_ane1}} m/s</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Arah angin</q-item-label>
                  <q-item-label caption>{{sensor.sb1_ane2}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-4">
            <q-list dark>
              <q-item-label header>sb3</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer x</q-item-label>
                  <q-item-label caption>{{sensor.sb3_acc1}} G</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer y</q-item-label>
                  <q-item-label caption>{{sensor.sb3_acc2}} G</q-item-label>
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
import MQTT from "mqtt"
import {processData} from '../controllers/dashboard'

export default {
  name: "HalamanDashboard",
  data() {
    return {
      mqtt: MQTT.connect("ws://bbta3.bppt.go.id:9623/mqtt", {
        username: process.env.BAMS_USER,
        password: process.env.BAMS_PWD
      }),
      sensor: {
        sb1_acc1: 0, sb1_acc2: 0, sb1_ane1: 0, sb1_ane2: 0, sb1_ane3: 0,
        sb2_acc1: 0, sb2_acc2: 0, sb2_acc3: 0, sb2_ane1: 0, sb2_ane2: 0, sb2_ane3: 0,
        sb3_acc1: 0, sb3_acc2: 0, 
        sb4_acc1: 0, sb4_acc2: 0,
        sb5_acc1: 0, sb5_acc2: 0,
        sb6_acc1: 0, sb6_acc2: 0,
      }
    }
  },
  created() {
    this.mqtt.on("packetreceive", async (topic) => {
      try {
        await this.mqtt.subscribe("BAMS")

        this.sensor = processData(topic, 8, 0)

        console.log(this.sensor)
      } catch (error) {
        console.log(error.message)
        this.mqtt.end()
      }
    })
  },
  destroyed() {
    this.mqtt.end()
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
