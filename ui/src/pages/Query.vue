<template>
  <q-page padding id="filterQuery">
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-2">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6">Pilih Data</div>
          </q-card-section>

          <q-card-section>
            <q-select filled v-model="node" :options="opsiNode" label="Node" />
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            <q-input filled v-model="tanggal" mask="date" :rules="['date']" label="Tanggal">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="tanggal" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section>

          <q-card-section>
            <q-btn push 
              color="white" 
              text-color="primary" 
              label="PROSES"
              size="lg"
              class="full-width" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-10">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6">Visualisasi data @{{node}}</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            <div id="query" class="q-mt-md" style="height:200px;"></div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style>
#filterQuery {
  background-image: url('~assets/suramadu_landscape.jpg');
  background-repeat: no-repeat;
  background-color: black;
  background-position-y: bottom;
}
</style>

<script>
import { date } from 'quasar'
import MQTT from "mqtt"

export default {
  name: "HalamanQuery",
  data() {
    return {
      tanggal: date.formatDate(new Date(), 'YYYY/MM/DD'),
      node: 'sb1',
      uid: '',
      opsiNode: ['sb1', 'sb2', 'sb3', 'sb4', 'sb5', 'sb6'],
      queryElement: null,
      trace: {},
      layout: {
        legend: {
          orientation: 'h'
        },
        margin: {
          l: 50,
          r: 0,
          b: 50,
          t: 0
        },
        yaxis: {
          title: 'amplitudo G'
        }
      },
      conf: {
        displaylogo: false,
        responsive: true,
        displayModeBar: false
      },
      mqtt: MQTT.connect("ws://bbta3.bppt.go.id:9623/mqtt", {
        username: process.env.BAMS_USER,
        password: process.env.BAMS_PWD
      }),
    };
  },
  mounted() {
    this.streamChart()
  },
  destroyed() {
    this.mqtt.end()
  },
  methods: {
    async streamChart() {
      this.queryElement = document.getElementById('query')
      const payload = await this.$axios.get(`http://localhost:9624/?node=${this.node}&?tanggal_waktu=${this.tanggal}`)
      this.uid = payload.data.id

      this.trace.trace1 = {
        x: [],
        y: [],
        fill: "tozeroy",
        type: 'scattergl',
        name: 'acc1',
        mode: 'lines',
        stackgroup: 'acc',
        connectgaps: false
      }

      this.trace.trace2 = {
        x: [],
        y: [],
        fill: "tozeroy",
        type: 'scattergl',
        name: 'acc2',
        mode: 'lines',
        stackgroup: 'acc',
        connectgaps: false
      }

      this.trace.trace3 = {
        x: [],
        y: [],
        fill: "tozeroy",
        type: 'scattergl',
        name: 'acc3',
        mode: 'lines',
        stackgroup: 'acc',
        connectgaps: false
      }

      Plotly.plot(
        this.queryElement, 
        [
          this.trace.trace1, 
          this.trace.trace2, 
          this.trace.trace3
        ],
        this.layout,
        this.conf
      )

      let acc1 = []
      let acc2 = []
      let acc3 = []
      let ane1 = []
      let waktu = []

      this.mqtt.on("packetreceive", async (topic) => {
        try {
          await this.mqtt.subscribe(`BAMS/query/${this.uid}`)

          if (topic.payload) {
            const string_sensor = new TextDecoder("utf-8").decode(topic.payload)
            const json_sensor = JSON.parse(string_sensor)

            waktu.push(date.formatDate(parseInt(json_sensor.id), 'HH:mm:ss.SSS'))
            acc1.push(json_sensor.bbta3_bams_suramadu_test.acc1)
            acc2.push(json_sensor.bbta3_bams_suramadu_test.acc2)
            acc3.push(json_sensor.bbta3_bams_suramadu_test.acc3)

            let update = {
              x: [
                waktu,
                waktu,
                waktu
              ],
              y: [
                acc1, 
                acc2,
                acc3
              ]
            }

            Plotly.restyle(this.queryElement, update)
          }
        } catch (error) {
          console.log(error.message)
          this.mqtt.end()
        }
      })
    }
  }
};
</script>