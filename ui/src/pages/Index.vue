<template>
  <q-page>
    <q-card>
      <q-card-section>
        <CustomChart />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script>
import CustomChart from "../components/Chart";

export default {
  name: "HalamanIndex",
  components: {
    CustomChart
  },
  data() {
    return {}
  }
}
</script>