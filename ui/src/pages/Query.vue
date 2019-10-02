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
            <q-input filled v-model="date" mask="date" :rules="['date']" label="Tanggal">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
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
      date: date.formatDate(new Date(), 'YYYY/MM/DD'),
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
        xaxis: {
          title: 'waktu'
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
      const payload = await this.$axios.get(`http://localhost:9624/?node=${this.node}&?tanggal_waktu=${this.date}`)
      this.uid = payload.data.id

      this.trace.trace1 = {
        x: [1, 2, 3, 4],
        y: [0, 2, 3, 5],
        fill: "tozeroy",
        type: 'scattergl',
        name: 'acc1',
        mode: 'lines',
        stackgroup: 'acc'
      }

      this.trace.trace2 = {
        x: [1, 2, 3, 4],
        y: [3, 5, 1, 7],
        fill: "tozeroy",
        type: 'scattergl',
        name: 'acc2',
        mode: 'lines',
        stackgroup: 'acc'
      }

      this.trace.trace3 = {
        x: [1, 2, 3, 4],
        y: [10, 7, 3, 1],
        fill: "tozeroy",
        type: 'scattergl',
        name: 'acc3',
        mode: 'lines',
        stackgroup: 'acc'
      }

      this.mqtt.on("packetreceive", async (topic) => {
        try {
          await this.mqtt.subscribe(`BAMS/query/${this.uid}`)

          if (topic.payload) console.log(new TextDecoder("utf-8").decode(topic.payload))
        } catch (error) {
          console.log(error.message)
          this.mqtt.end()
        }
      })

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
    }
  }
};
</script>