<template>
  <div id="app">
    <h2 class="center">Credits Left {{ credits }}</h2>
    <odds-component></odds-component>
    <h2>Your Bets</h2>
    <OpenBetsTable></OpenBetsTable>
    <br>
    <h2>Opposing Bets</h2>
    <OpponentsBets></OpponentsBets>
    <br>
    <h2>Leaderboard (it's not done yet bing chilling)</h2>
    <LeaderBoard></LeaderBoard>
  </div>
</template>

<script>
import LeaderBoard from './components/LeaderBoard.vue';
import OddsComponent from './components/OddsComponent.vue';
import OpenBetsTable from './components/OpenBetsTable'
import OpponentsBets from './components/OpponentsBets.vue';


export default {
  name: 'App',
  components: {
    OddsComponent,
    OpenBetsTable,
    OpponentsBets,
    LeaderBoard
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
.center {
  margin: auto;
  width: 50%;
  border: 3px solid green;
  padding: 10px;
  margin-bottom:1%;
}
</style>