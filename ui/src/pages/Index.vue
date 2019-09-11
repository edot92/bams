<template>
  <q-page padding>
    <div class="row">
      <div class="col-1">
        <img src="~assets/suramadu.png" style="height:130vw;max-height:650px;" />
      </div>
      <div class="col-11">
        <q-card>
          <q-bar class="bg-secondary">
            <q-icon name="eva-bulb" color="white" />
            <div class="text-white">Baca Data Sensor</div>
          </q-bar>

          <q-card-section>
            <div v-if="loading">
              Sedang memuat...
              <q-spinner-cube color="primary" size="2em" />
            </div>
            <canvas id="streamChart" class="full-width" style="max-height: 550px;" v-else></canvas>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import Chart from "chart.js";
import MQTT from "mqtt";

export default {
  name: "HalamanIndex",
  data() {
    return {
      loading: true,
      maxData: 100,
      mChart: null,
      client: null
    };
  },
  mounted() {
    this.client = MQTT.connect("ws://bbta3.bppt.go.id:9623/mqtt", {
      username: process.env.BAMS_USER,
      password: process.env.BAMS_PWD
    });

    this.streamData();
  },
  destroyed() {
    this.client.end();
  },
  methods: {
    drawTheChart() {
      let ctx = document.getElementById("streamChart").getContext("2d");
      this.mChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Akselerometer 1",
              data: [],
              backgroundColor: "rgba(129, 212, 250, 0.2)",
              borderColor: "rgba(129, 212, 250, 1)",
              borderWidth: 1
            },
            {
              label: "Akselerometer 2",
              data: [],
              backgroundColor: "rgba(104, 159, 56, 0.2)",
              borderColor: "rgba(104, 159, 56, 1)",
              borderWidth: 1
            }
          ]
        },
        options: {
          // animation: false,
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
                  beginAtZero: true
                },
                display: false,
                stacked: true
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                },
                display: false,
                stacked: true
              }
            ]
          }
        }
      });
    },
    streamData() {
      const n = 8; // pisah setiap 8 karakter
      let waktu_ms = 0; // satuan milli second
      // let that = this;

      this.client.on("packetreceive", async topic => {
        try {
          this.loading = false;
          await this.client.subscribe("BAMS");
          if (topic.payload) {
            this.drawTheChart();

            const node = topic.payload.toString().slice(0, 3);
            const timestamp =
              parseInt(topic.payload.toString().slice(3, 11), 16) * 1000;
            const raw_sensor = topic.payload
              .toString()
              .slice(11, topic.payload.toString().length);

            let acc1 = [];
            let acc2 = [];
            let acc3 = [];
            let ane1 = null;
            let ane2 = null;
            let ane3 = null;

            for (let index = 11; index <= raw_sensor.length + n; index += n) {
              const sensor_item_raw = topic.payload
                .toString()
                .slice(index, index + n);
              const sensor_item = Buffer.from(
                sensor_item_raw,
                "hex"
              ).readFloatBE(0);

              if (node == "sb2") {
                if (index >= 11 && index <= 803) {
                  acc1.push(sensor_item);
                } else if (index >= 811 && index <= 1603) {
                  acc2.push(sensor_item);
                } else if (index >= 1611 && index <= 2403) {
                  acc3.push(sensor_item);
                } else if (index == 2411) {
                  ane1 = sensor_item;
                } else if (index == 2419) {
                  ane2 = sensor_item;
                } else if (index == 2427) {
                  ane3 = sensor_item;
                }
              } else if (node == "sb1") {
                if (index >= 11 && index <= 803) {
                  acc1.push(sensor_item);
                } else if (index >= 811 && index <= 1603) {
                  acc2.push(sensor_item);
                } else if (index == 1611) {
                  ane1 = sensor_item;
                } else if (index == 1619) {
                  ane2 = sensor_item;
                } else if (index == 1627) {
                  ane3 = sensor_item;
                }
              } else {
                if (index >= 11 && index <= 803) {
                  acc1.push(sensor_item);
                } else if (index >= 811 && index <= 1603) {
                  acc2.push(sensor_item);
                }
              }
            }

            let payload = null;

            for (let i = 0; i < 100; i++) {
              payload = {
                ts: timestamp + waktu_ms,
                node: node,
                acc1: acc1.length > 0 ? acc1[i] : null,
                acc2: acc2.length > 0 ? acc2[i] : null,
                acc3: node == "sb2" && acc3.length > 0 ? acc3[i] : null,
                arah: ane2,
                grup_kec: ane1,
                kecepatan: ane1,
                kompas: ane2 ? d2c.toCompas(ane2) : null,
                sudut_serang: ane3
              };

              if (this.mChart.data.labels.length > this.maxBar)
                this.mChart.data.labels.shift();
              this.mChart.data.labels.push(timestamp + waktu_ms);

              this.mChart.data.datasets.forEach(dataset => {
                if (dataset.data.length > this.maxBar) {
                  dataset.data.shift();
                }
                if (dataset.label == "Akselerometer 1") {
                  dataset.data.push(acc1[i]);
                } else {
                  dataset.data.push(acc2[i]);
                }
              });

              this.mChart.update()

              waktu_ms += 10; // dalam satuan ms, 1 s ada 100 data getaran
            }
          }
        } catch (error) {
          console.log(error);
          this.loading = true;
        }
      });
    }
  }
};
</script>