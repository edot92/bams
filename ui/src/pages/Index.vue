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
            <div class="text-white">Data Sensor di {{node}}</div>
          </q-bar>

          <q-card-section>
            <CustomChart :connection="client" :node-sensor="node" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import MQTT from "mqtt";

import CustomChart from "../components/Chart";

export default {
  name: "HalamanIndex",
  components: {
    CustomChart
  },
  data() {
    return {
      client: MQTT.connect("ws://bbta3.bppt.go.id:9623/mqtt", {
        username: process.env.BAMS_USER,
        password: process.env.BAMS_PWD
      }),
      node : 'sb1'
    };
  },
  destroyed() {
    this.client.end();
  },
  methods: {}
};
</script>