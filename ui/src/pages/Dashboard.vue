<template>
  <q-page padding id="dashboard">
    <div class="column">
      <div class="col self-end">
        <div class="row">
          <div class="col-4">
            <q-list dark bordered separator>
              <q-item-label header>sb6</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer x</q-item-label>
                  <q-item-label caption>0.16589746 G</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer y</q-item-label>
                  <q-item-label caption>-0.1234568 G</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-4">
            <q-list dark bordered separator>
              <q-item-label header>sb2</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer x</q-item-label>
                  <q-item-label caption>0.235123 G</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer y</q-item-label>
                  <q-item-label caption>0.111456789 G</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer z</q-item-label>
                  <q-item-label caption>-0.111456789 G</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>Kecepatan angin</q-item-label>
                  <q-item-label caption>1.56 m/s</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>Arah angin</q-item-label>
                  <q-item-label caption>BR</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-4">
            <q-list dark bordered separator>
              <q-item-label header>sb6</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer x</q-item-label>
                  <q-item-label caption>0.16589746 G</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer y</q-item-label>
                  <q-item-label caption>-0.1234568 G</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
      <div class="col-8" style="height: 200px"></div>
      <div class="col self-start">
        <div class="row">
          <div class="col-4">
            <q-list dark bordered separator>
              <q-item-label header>sb5</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer x</q-item-label>
                  <q-item-label caption>0.16589746 G</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer y</q-item-label>
                  <q-item-label caption>-0.1234568 G</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-4">
            <q-list dark bordered separator>
              <q-item-label header>sb1</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer x</q-item-label>
                  <q-item-label caption>0.235123 G</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer y</q-item-label>
                  <q-item-label caption>0.111456789 G</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>Kecepatan angin</q-item-label>
                  <q-item-label caption>1.56 m/s</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>Arah angin</q-item-label>
                  <q-item-label caption>BR</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-4">
            <q-list dark bordered separator>
              <q-item-label header>sb3</q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer x</q-item-label>
                  <q-item-label caption>0.16589746 G</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>Akselerometer y</q-item-label>
                  <q-item-label caption>-0.1234568 G</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "HalamanDashboard"
};
</script>

<style lang="stylus">
#dashboard {
  background-image: url('~assets/suramadu.jpg');
  background-size: cover;
}
</style>
