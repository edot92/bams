<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="bg-gradient-primary">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="eva-menu-outline" />
        <q-toolbar-title>
          BAMS BBTA3
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          @click="goToTentang()"
          aria-label="Tentang">
          <q-icon name="eva-question-mark-circle-outline" />
        </q-btn>

        <q-btn
          flat
          dense
          round
          @click="cobaKeluar"
          aria-label="Keluar">
          <q-icon name="eva-log-out-outline" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
        :width="180"
        :breakpoint="500"
        bordered
        content-class="bg-grey-10">
        <q-scroll-area class="fit">
          <q-list padding class="text-white">
            <q-item :to="{name: 'stream'}" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="eva-activity-outline" />
              </q-item-section>

              <q-item-section>
                STREAM
              </q-item-section>
            </q-item>

            <q-item :to="{name: 'query'}" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="eva-monitor-outline" />
              </q-item-section>

              <q-item-section>
                QUERY
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

    <q-page-container>
      <div class="row q-ma-md">
        <div class="col-1">
          <img src="~assets/suramadu.png" style="height:130vw;max-height:650px;" />
        </div>
        <div class="col-11">
          <q-toolbar class="bg-secondary text-white shadow-0">
            <q-icon name="eva-bulb" color="white" />
            <div class="text-white on-right">Data Sensor</div>

            <q-space />

            <q-btn-toggle
              v-model="node"
              flat stretch
              toggle-color="yellow"
              :options="[
                {label: 'sb1', value: 'sb1'},
                {label: 'sb2', value: 'sb2'},
                {label: 'sb3', value: 'sb3'},
                {label: 'sb4', value: 'sb4'},
                {label: 'sb5', value: 'sb5'},
                {label: 'sb6', value: 'sb6'},
              ]"
              @click="$router.push({name: 'stream_node', params: {node}})"
            />
          </q-toolbar>
          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import MQTT from "mqtt";

export default {
  name: 'Stream',
  data () {
    return {
      drawer: false,
      miniState: true,
      user: {
        id: '',
        hasAvatar: false,
        urlAvatar: ''
      },
      client: null,
      node: 'sb1'
    }
  },
  created() {
    this.$firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user.id = user.uid
      }
    })
    this.$store.commit('node/nodeMutation', {
      client: MQTT.connect("ws://bbta3.bppt.go.id:9623/mqtt", {
        username: process.env.BAMS_USER,
        password: process.env.BAMS_PWD
      }),
      number: this.$route.params.node ? this.$route.params.node : 'sb1'
    })
  },
  mounted() {
    this.client = this.$store.getters['node/nodeClientGetter']
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.commit('node/nodeMutation', {
      number: to.params.node,
    })
  },
  destroyed() {
    this.client.end()
    this.$store.commit('node/nodeMutation', {
      client: null,
      number: 'sb1'
    })
  },
  methods: {
    async cobaKeluar() {
      try {
        await this.$firebase.auth().signOut()
        this.$router.push('/masuk')
      } catch (err) {
        console.log(err.message)
      }
    },
    goToTentang() {
      this.$router.push({name: 'tentang'})
    }
  },
}
</script>

<style>
</style>
