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

          <q-tabs dense v-model="tab" class="text-teal">
            <q-tab label="Min." name="min" />
            <q-tab label="Max." name="max" />
            <q-tab label="Mean" name="mean" />
            <q-tab label="STD" name="std" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab">
            <q-tab-panel name="min" class="q-px-none">
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>akselerometer 1 (G)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.min.acc1}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>akselerometer 2 (G)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.min.acc2}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>akselerometer 3 (G)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.min.acc3}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>kecepatan angin (m/s)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.min.ane1}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="max" class="q-px-none">
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>akselerometer 1 (G)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.max.acc1}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>akselerometer 2 (G)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.max.acc2}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>akselerometer 3 (G)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.max.acc3}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>kecepatan angin (m/s)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.max.ane1}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="mean" class="q-px-none">
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>akselerometer 1 (G)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.mean.acc1}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>akselerometer 2 (G)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.mean.acc2}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>akselerometer 3 (G)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.mean.acc3}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>kecepatan angin (m/s)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.mean.ane1}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="std" class="q-px-none">
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>akselerometer 1 (G)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.std.acc1}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>akselerometer 2 (G)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.std.acc2}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>akselerometer 3 (G)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.std.acc3}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>kecepatan angin (m/s)</q-item-label>
                    <q-item-label class="text-h5">{{statistik.std.ane1}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <div class="col-12 col-md-10">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6">Visualisasi data @{{node}}</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            <div id="query" class="q-mt-md" style="height:420px;"></div>
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
import { min, max, mean, std } from 'mathjs/number'

export default {
  name: "HalamanQuery",
  data() {
    return {
      tab: 'min',
      tanggal: date.formatDate(new Date(), 'YYYY/MM/DD HH:mm:ss'),
      node: 'sb1',
      uid: '',
      opsiNode: ['sb1', 'sb2', 'sb3', 'sb4', 'sb5', 'sb6'],
      queryElement: null,
      trace: {
        trace1: {
          x: [],
          y: [],
          xaxis: 'x1',
          yaxis: 'y1',
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
          xaxis: 'x1',
          yaxis: 'y1',
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
          xaxis: 'x1',
          yaxis: 'y1',
          fill: "tozeroy",
          type: 'scattergl',
          name: 'acc3',
          mode: 'lines',
          stackgroup: 'acc',
          connectgaps: false
        },
        trace4: {
          x: [],
          y: [],
          xaxis: 'x2',
          yaxis: 'y2',
          fill: "tozeroy",
          type: 'scattergl',
          name: 'kecepatan',
          mode: 'lines',
          stackgroup: 'kecepatan',
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
        yaxis1: {
          title: 'amplitudo G'
        },
        yaxis2: {
          title: 'kecepatan m/s'
        },
        grid: {
          rows: 2,
          columns: 1,
          pattern: 'independent',
          roworder: 'bottom to top'
        }
      },
      conf: {
        displaylogo: false,
        responsive: true,
        displayModeBar: false
      },
      mqtt: MQTT.connect("ws://103.224.137.103:9623/mqtt", {
        username: process.env.BAMS_USER,
        password: process.env.BAMS_PWD
      }),
      statistik: {
        min: {
          acc1: 0,
          acc2: 0,
          acc3: 0,
          ane1: 0
        },
        max: {
          acc1: 0,
          acc2: 0,
          acc3: 0,
          ane1: 0
        },
        mean: {
          acc1: 0,
          acc2: 0,
          acc3: 0,
          ane1: 0
        },
        std: {
          acc1: 0,
          acc2: 0,
          acc3: 0,
          ane1: 0
        }
      }
    };
  },
  mounted() {
    this.queryElement = document.getElementById('query')

    Plotly.plot(
      this.queryElement, 
      [
        this.trace.trace1, 
        this.trace.trace2, 
        this.trace.trace3,
        this.trace.trace4
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

            sensor_obj.push({
              id: date.formatDate(parseInt(json_sensor.id), 'HH:mm:ss.SSS'),
              acc1: json_sensor.bbta3_bams_suramadu_test.acc1 ? json_sensor.bbta3_bams_suramadu_test.acc1 : 0,
              acc2: json_sensor.bbta3_bams_suramadu_test.acc2 ? json_sensor.bbta3_bams_suramadu_test.acc2 : 0,
              acc3: json_sensor.bbta3_bams_suramadu_test.acc3 ? json_sensor.bbta3_bams_suramadu_test.acc3 : 0,
              ane1: json_sensor.bbta3_bams_suramadu_test.kecepatan ? json_sensor.bbta3_bams_suramadu_test.kecepatan : 0
            })

            doSort(sensor_obj).asc(u => u.id)

            this.statistik.min.acc1 = min(sensor_obj.map(sensor => {return sensor.acc1})).toFixed(3)
            this.statistik.min.acc2 = min(sensor_obj.map(sensor => {return sensor.acc2})).toFixed(3)
            this.statistik.min.acc3 = min(sensor_obj.map(sensor => {return sensor.acc3})).toFixed(3)
            this.statistik.min.ane1 = min(sensor_obj.map(sensor => {return sensor.ane1})).toFixed(3)

            this.statistik.max.acc1 = max(sensor_obj.map(sensor => {return sensor.acc1})).toFixed(3)
            this.statistik.max.acc2 = max(sensor_obj.map(sensor => {return sensor.acc2})).toFixed(3)
            this.statistik.max.acc3 = max(sensor_obj.map(sensor => {return sensor.acc3})).toFixed(3)
            this.statistik.max.ane1 = max(sensor_obj.map(sensor => {return sensor.ane1})).toFixed(3)

            this.statistik.mean.acc1 = mean(sensor_obj.map(sensor => {return sensor.acc1})).toFixed(3)
            this.statistik.mean.acc2 = mean(sensor_obj.map(sensor => {return sensor.acc2})).toFixed(3)
            this.statistik.mean.acc3 = mean(sensor_obj.map(sensor => {return sensor.acc3})).toFixed(3)
            this.statistik.mean.ane1 = mean(sensor_obj.map(sensor => {return sensor.ane1})).toFixed(3)

            this.statistik.std.acc1 = std(sensor_obj.map(sensor => {return sensor.acc1})).toFixed(3)
            this.statistik.std.acc2 = std(sensor_obj.map(sensor => {return sensor.acc2})).toFixed(3)
            this.statistik.std.acc3 = std(sensor_obj.map(sensor => {return sensor.acc3})).toFixed(3)
            this.statistik.std.ane1 = std(sensor_obj.map(sensor => {return sensor.ane1})).toFixed(3)

            let update = {
              x: [
                sensor_obj.map(sensor => {return sensor.id}),
                sensor_obj.map(sensor => {return sensor.id}),
                sensor_obj.map(sensor => {return sensor.id}),
                sensor_obj.map(sensor => {return sensor.id})
              ],
              y: [
                sensor_obj.map(sensor => {return sensor.acc1}), 
                sensor_obj.map(sensor => {return sensor.acc2}),
                sensor_obj.map(sensor => {return sensor.acc3}),
                sensor_obj.map(sensor => {return sensor.ane1})
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
          this.trace.trace4.x = []
          this.trace.trace4.y = []
        }
      })
    }
  }
};
</script>