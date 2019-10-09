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
              class="full-width" 
              @click="doStreamChart()" />
          </q-card-section>
        </q-card>

        <q-card flat bordered class="q-mt-sm">
          <q-card-section>
            <div class="text-h6">Statistik</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            Total data: {{counter}}
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
  background-color: #040517;
  background-position-y: bottom;
}
</style>

<script>
import { date, uid } from 'quasar'
import MQTT from "async-mqtt"
import doSort from 'fast-sort'

export default {
  name: "HalamanQuery",
  data() {
    return {
      tanggal: date.formatDate(new Date(), 'YYYY/MM/DD'),
      node: 'sb1',
      uid: '',
      opsiNode: ['sb1', 'sb2', 'sb3', 'sb4', 'sb5', 'sb6'],
      queryElement: null,
      trace: {
        trace1: {
          x: [],
          y: [],
          fill: "tozeroy",
          type: 'scattergl',
          name: 'acc1',
          mode: 'lines',
          stackgroup: 'acc',
          connectgaps: false
        },
        trace2: {
          x: [],
          y: [],
          fill: "tozeroy",
          type: 'scattergl',
          name: 'acc2',
          mode: 'lines',
          stackgroup: 'acc',
          connectgaps: false
        },
        trace3: {
          x: [],
          y: [],
          fill: "tozeroy",
          type: 'scattergl',
          name: 'acc3',
          mode: 'lines',
          stackgroup: 'acc',
          connectgaps: false
        }
      },
      layout: {
        legend: {
          orientation: 'h',
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
      counter: 0
    };
  },
  mounted() {
    this.queryElement = document.getElementById('query')

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

    this.streamChart()
  },
  destroyed() {
    this.mqtt.unsubscribe(`BAMS/query/${this.genUid}`)
    this.mqtt.end()
  },
  methods: {
    async streamChart() {
      this.genUid = uid()
      await this.$axios.get(`
        http://${process.env.BAMS_HOST_BACKEND}:9624/?node=${this.node}&tanggal_waktu=${this.tanggal}&uid=${this.genUid}
      `)

      let sensor_obj = []

      this.mqtt.on("packetreceive", async (topic) => {
        try {
          await this.mqtt.subscribe(`BAMS/query/${this.genUid}`)

          if (topic.payload) {
            const string_sensor = new TextDecoder("utf-8").decode(topic.payload)
            const json_sensor = JSON.parse(string_sensor)

            // sensor_obj['waktu'].push(date.formatDate(parseInt(json_sensor.id), 'HH:mm:ss.SSS'))
            // sensor_obj['acc1'].push(json_sensor.bbta3_bams_suramadu_test.acc1)
            // sensor_obj['acc2'].push(json_sensor.bbta3_bams_suramadu_test.acc2)
            // sensor_obj['acc3'].push(json_sensor.bbta3_bams_suramadu_test.acc3)

            sensor_obj.push(json_sensor)
            doSort(sensor_obj).asc(u => u.id)
            this.counter += 1

            let update = {
              x: [
                sensor_obj.map(sensor => {return date.formatDate(parseInt(sensor.id), 'HH:mm:ss.SSS')}),
                sensor_obj.map(sensor => {return date.formatDate(parseInt(sensor.id), 'HH:mm:ss.SSS')}),
                sensor_obj.map(sensor => {return date.formatDate(parseInt(sensor.id), 'HH:mm:ss.SSS')})
              ],
              y: [
                sensor_obj.map(sensor => {return sensor.bbta3_bams_suramadu_test.acc1}), 
                sensor_obj.map(sensor => {return sensor.bbta3_bams_suramadu_test.acc2}),
                sensor_obj.map(sensor => {return sensor.bbta3_bams_suramadu_test.acc3})
              ]
            }

            Plotly.restyle(this.queryElement, update)
          }
        } catch (error) {
          // console.log(error.message)
          this.mqtt.end(() => {
            this.mqtt.unsubscribe(`BAMS/query/${this.genUid}`)
          })
        }
      })
    },
    doStreamChart() {
      this.resetChart()
      this.streamChart()
    },
    resetChart() {
      this.mqtt.unsubscribe(`BAMS/query/${this.genUid}`, err => {
        if (!err) {
          this.trace.trace1.x = []
          this.trace.trace1.y = []
          this.trace.trace2.x = []
          this.trace.trace2.y = []
          this.trace.trace3.x = []
          this.trace.trace3.y = []
        }
      })
    }
  }
};
</script>