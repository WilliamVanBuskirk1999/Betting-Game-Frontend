<template>
  <div id="app">
    <odds-component></odds-component>
    <open-bets-table :open-bets=openBets></open-bets-table>
  </div>
</template>

<script>
import OddsComponent from './components/OddsComponent.vue';
import { OpenBetsTable } from './components/OpenBetsTable.vue'
import { toRaw } from 'vue';

export default {
  name: 'App',
  components: {
    OddsComponent,
    OpenBetsTable
  },
  computed: {
    openBets() {
      return toRaw(this.$store.getters.getOpenBets.value)
    },
  }
};
</script>

<style>
/* Add any custom styles here */
</style>