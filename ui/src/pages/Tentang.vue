<template>
  <q-page padding>
    <q-card>
      <q-bar class="bg-info">
        <q-icon name="eva-bulb" />
        <div>BAMS BBTA3 BPPT</div>
      </q-bar>

      <q-card-section>
        <p>
          Wind load is one of the structural loads which have influence on bridge design, 
          especially for structural and aerodynamic design. The important role of wind loads 
          is more significant after it caused several of bridge structures to either collapse 
          completely with catastrophic failure such as Tacoma Narrows Bridge at 1940 or 
          experience serviceability discomforts at Volgograd Bridge where the authorities 
          closed the bridge to all motor traffic due to strong oscillations caused by windy 
          conditions.
        </p>

        <p>
          <b>Bridge Aeroelastic Monitoring System</b> (BAMS) was made for that ensure bridge safety 
          and comfort with accurate, comprehensive data, and easy to use. User can get instant 
          monthly report for the wind speeds, wind direction, and bridge vibration. More than 
          that the user can get wind characteristics and bridge Aeroelastic characteristics to 
          ensure the structural bridge performance related to wind speed.
        </p>
      </q-card-section>

      <q-card-section>
        <q-btn 
          push 
          rounded 
          color="primary" 
          label="" 
          size="md"
          @click="$router.push('/')"
          icon="eva-undo-outline" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageTentang',
}
</script>

<style>
</style>
