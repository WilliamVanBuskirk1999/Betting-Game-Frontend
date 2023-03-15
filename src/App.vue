<template>
  <div id="app">
    <h2>Credits Left {{ credits }}</h2>
    <odds-component></odds-component>
    <br/>
    <OpenBetsTable></OpenBetsTable>
  </div>
</template>

<script>
import OddsComponent from './components/OddsComponent.vue';
import OpenBetsTable from './components/OpenBetsTable'


export default {
  name: 'App',
  components: {
    OddsComponent,
    OpenBetsTable
  },
  computed: {
    credits() {
      return this.$store.getters.getCredits.value
    }
  }
};
</script>

<style>
/* Add any custom styles here */
</style>