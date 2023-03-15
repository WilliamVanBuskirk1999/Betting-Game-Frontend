<template>
<div>
  <img alt="Vue logo" :src="require(`${imgSrc}`)">
    <h2>Points Left {{bettingPool}}</h2>
    <label for="betAmount">Bet Amount</label>
    <input v-model="betAmount" id="betAmount">
    <br/>
    <betting-table @addToBet="addToBet"></betting-table>
    <results-table></results-table>
</div>
</template>

<script>
import BettingTable from './components/BettingTable.vue'
import ResultsTable from './components/ResultsTable.vue'

export default {
  name: 'App',
  components: {
   BettingTable,
   ResultsTable
  },
  data: {
    parlays: [],
    betAmount: ''
  },
  computed: {
    bettingPool() {
      return this.$store.state.bettingAmount
    },
    imgSrc() {
      const amount = this.$store.state.bettingAmount
      if(amount >= 1000) {
        return './assets/marty5.png'
      } else if (amount >= 800 && amount <= 999) {
        return './assets/marty4.png'
      } else if(amount >=500 && amount <=799) {
        return './assets/marty3.png'
      } else if(amount >= 250 && amount <=499) {
        return './assets/marty2.png'
      } else if(amount <= 249) {
        return './assets/marty1.png'
      }

      return './assets/marty3.png' 
    }
  },
  methods: {
    addToBet(val) {
      const currentTotal = this.$store.state.bettingAmount

    if(currentTotal > 0) {
      if(val.odds.startsWith('-')) {
        const newTotal = currentTotal - this.betAmount
        this.$store.state.bettingAmount = Math.trunc(newTotal * 100) / 100
        const oddsToCalc = odds.substring(1)
        const unRounded = (100 / oddsToCalc) * this.betAmount

        this.payout = Math.trunc(unRounded*100) / 100
        this.$store.state.openBets.push({name: val.name, bet: this.betAmount, payout: this.payout})
      } else if(val.odds.startsWith('+')) {
        const newTotal = currentTotal - this.betAmount
        this.$store.state.bettingAmount = Math.trunc(newTotal * 100) / 100
        const oddsToCalc = val.odds.substring(1)
        const unRounded = this.betAmount * (oddsToCalc / 100)

        this.payout = Math.trunc(unRounded*100) / 100
        this.$store.state.openBets.push({name: val.name, bet: this.betAmount, payout: this.payout})
      }
    }
  }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
