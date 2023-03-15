<template>
  <div>
    <button @click="showOdds">Show Odds</button>
    <div v-if="oddsDataReady">
    <h1>Plus Odds</h1>
    <ul>
      <li v-for="odds in plusOdds" :key="odds.id" @click="selectOdds(odds)">
        {{ odds.name }} - {{ odds.value }}
      </li>
    </ul>

    <h1>Minus Odds</h1>
    <ul>
      <li v-for="odds in minusOdds" :key="odds.id" @click="selectOdds(odds)">
        {{ odds.name }} - {{ odds.value }}
      </li>
    </ul>

    <div>
      <label for="bet">Bet:</label>
      <input type="number" id="bet" v-model="betAmount" />

      <button @click="calculateWinnings">Calculate Winnings</button>

      <div v-if="winnings > 0">
        Winnings: {{ winnings }}
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'OddsComponent',
  computed: {
    ...mapGetters({
      plusOdds: 'getPlusOdds',
    }),
    minusOdds() {
      return this.$store.getters.getMinusOdds;
    },
    oddsDataReady() {
      return this.plusOdds.length && this.minusOdds.length;
    }
  },
  data() {
    return {
      selectedOdds: null,
      betAmount: null,
      winnings: null,
    };
  },
  methods: {
    selectOdds(odds) {
      this.selectedOdds = odds;
    },
    calculateWinnings() {
      if (this.selectedOdds && this.betAmount) {
        const payout = this.selectedOdds.value * this.betAmount;
        this.winnings = payout.toFixed(2);
      } else {
        this.winnings = null;
      }
    },
    showOdds() {
      console.log(this.$store.getters.getPlusOdds)
      console.log(this.plusOdds)
    },
  },
  mounted() {
    this.$store.dispatch('fetchOdds')
  }
};
</script>