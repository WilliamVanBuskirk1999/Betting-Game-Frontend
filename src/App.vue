<template>
  <div id="app">
    <h2>Credits Left {{ credits }}</h2>
    <odds-component></odds-component>
    <br/>
    <OpenBetsTable></OpenBetsTable>
    <br>
    <h2>Opposing Bets</h2>
    <OpponentsBets></OpponentsBets>
  </div>
</template>

<script>
import OddsComponent from './components/OddsComponent.vue';
import OpenBetsTable from './components/OpenBetsTable'
import OpponentsBets from './components/OpponentsBets.vue';


export default {
  name: 'App',
  components: {
    OddsComponent,
    OpenBetsTable,
    OpponentsBets
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