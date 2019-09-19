<template>
  <div>
    <div class="q-mb-md" v-if="loading">
      Sedang memuat...
      <q-spinner-cube color="primary" size="2em" />
    </div>
    <canvas id="streamChart" class="full-width" style="max-height: 400px;"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js"

export default {
  name: "ChartComponent",
  data() {
    return {
      client: null,
      loading: true,
      maxData: 500,
      mChart: null
    }
  },
  mounted() {
    this.client = this.$store.getters["node/nodeClientGetter"]
    this.node_sensor = this.$store.getters["node/nodeGetter"]

    this.streamData()
  },
  methods: {
    drawTheChart() {
      let ctx = document.getElementById("streamChart").getContext("2d")
      this.mChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Akselerometer 1",
              data: [],
              fill: false,
              borderColor: "#FF5F6D",
              borderWidth: 1,
              lineTension: 0,
              pointStyle: "cross"
            },
            {
              label: "Akselerometer 2",
              data: [],
              fill: false,
              borderColor: "#FFC371",
              borderWidth: 1,
              lineTension: 0,
              pointStyle: "triangle"
            },
            {
              label: "Akselerometer 3",
              data: [],
              fill: false,
              borderColor: "#6dd5ed",
              borderWidth: 1,
              lineTension: 0,
              pointStyle: "triangle"
            }
          ]
        },
        options: {
          legend: {
            position: "bottom"
            // labels: {usePointStyle: true}
          },
          tooltips: {
            position: "nearest",
            mode: "index"
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  source: "data"
                },
                display: true,
                stacked: true
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: "G"
                },
                display: true,
                stacked: true
              }
            ]
          }
        }
      })
    },
    streamData() {
      const n = 8 // pisah setiap 8 karakter
      let waktu_ms = 0 // satuan milli second

      this.client.on("connect", () => {
        this.drawTheChart()
      })

      this.client.on("packetreceive", async topic => {
        try {
          await this.client.subscribe("BAMS")
          if (topic.payload) {
            this.loading = false
            const node = topic.payload.toString().slice(0, 3)
            const timestamp =
              parseInt(topic.payload.toString().slice(3, 11), 16) * 1000
            const raw_sensor = topic.payload
              .toString()
              .slice(11, topic.payload.toString().length)

            let acc1 = []
            let acc2 = []
            let acc3 = []
            let ane1 = null
            let ane2 = null
            let ane3 = null

            for (let index = 11; index <= raw_sensor.length + n; index += n) {
              const sensor_item_raw = topic.payload
                .toString()
                .slice(index, index + n)
              const sensor_item = Buffer.from(
                sensor_item_raw,
                "hex"
              ).readFloatBE(0)

              if (node == "sb2") {
                if (index >= 11 && index <= 803) {
                  if (node == this.node_sensor) acc1.push(sensor_item)
                } else if (index >= 811 && index <= 1603) {
                  if (node == this.node_sensor) acc2.push(sensor_item)
                } else if (index >= 1611 && index <= 2403) {
                  if (node == this.node_sensor) acc3.push(sensor_item)
                } else if (index == 2411) {
                  if (node == this.node_sensor) ane1 = sensor_item
                } else if (index == 2419) {
                  if (node == this.node_sensor) ane2 = sensor_item
                } else if (index == 2427) {
                  if (node == this.node_sensor) ane3 = sensor_item
                }
              } else if (node == "sb1") {
                if (index >= 11 && index <= 803) {
                  if (node == this.node_sensor) acc1.push(sensor_item)
                } else if (index >= 811 && index <= 1603) {
                  if (node == this.node_sensor) acc2.push(sensor_item)
                } else if (index == 1611) {
                  if (node == this.node_sensor) ane1 = sensor_item
                } else if (index == 1619) {
                  if (node == this.node_sensor) ane2 = sensor_item
                } else if (index == 1627) {
                  if (node == this.node_sensor) ane3 = sensor_item
                }
              } else {
                if (index >= 11 && index <= 803) {
                  if (node == this.node_sensor) acc1.push(sensor_item)
                } else if (index >= 811 && index <= 1603) {
                  if (node == this.node_sensor) acc2.push(sensor_item)
                }
              }
            }

            for (let i = 0; i < 100; i++) {
              if (this.mChart.data.labels.length > this.maxData)
                this.mChart.data.labels.shift()
              let waktu_lokal = new Date(timestamp + waktu_ms)
              this.mChart.data.labels.push(waktu_lokal.toLocaleTimeString())

              this.mChart.data.datasets.forEach(dataset => {
                if (dataset.data.length > this.maxData) {
                  dataset.data.shift()
                }

                if (dataset.label == "Akselerometer 1") {
                  dataset.data.push(acc1[i])
                } else if (dataset.label == "Akselerometer 2") {
                  dataset.data.push(acc2[i])
                } else {
                  dataset.data.push(acc3[i])
                }
              })

              this.mChart.update()

              waktu_ms += 10 // dalam satuan ms, 1 s ada 100 data getaran
            }
          }
        } catch (error) {
          console.log(error)
          this.loading = true
        }
      })
    }
  },
  computed: {
    node_sensor: {
      get: function () {
        return this.$store.getters["node/nodeGetter"]
      },
      set: function (newValue) {
        this.$store.commit("node/nodeMutation", {
          number: newValue
        })
      }
    }
  }
}
</script>

<style>
</style>
