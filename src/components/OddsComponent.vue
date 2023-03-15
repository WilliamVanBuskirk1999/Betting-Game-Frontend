<template>
  <div>
    <div v-if="oddsDataReady">
    <h1>Plus Odds</h1>
    <ul>
      <li v-for="odds in plusOdds" :key="odds.id">
        <label>
          <input type="radio" name="plus-odds" :value="odds" @click="selectOdds(odds.odds)">
          {{ odds.name }} - {{ odds.odds }}
        </label>
      </li>
    </ul>

    <h1>Minus Odds</h1>
    <ul>
      <li v-for="odds in minusOdds" :key="odds.id">
        <label>
          <input type="radio" name="plus-odds" :value="odds" @click="selectOdds(odds.odds)">
          {{ odds.name }} - {{ odds.odds }}
        </label>
      </li>
    </ul>

    <div>
      <label for="bet">Bet:</label>
      <input type="number" id="bet" v-model="betAmount" />

      <button @click="calculateWinnings">Calculate Winnings</button>

      <div>
        Winnings: {{ winnings }}
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { toRaw } from 'vue';

export default {
  name: 'OddsComponent',
  computed: {
    plusOdds() {
      return toRaw(this.$store.getters.getPlusOdds.value);
    },
    minusOdds() {
      return toRaw(this.$store.getters.getMinusOdds.value);
    },
    openBets() {
      return toRaw(this.$store.getters.getOpenBets.value)
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
    console.log(this.openBets)
  if (this.selectedOdds && this.betAmount) {
    const odds = parseFloat(this.selectedOdds);
    const isNegativeOdds = odds < 0;
    const multiplier = isNegativeOdds ? (1 - 100 / Math.abs(odds)) : (1 + odds / 100);
    const payout = this.betAmount * multiplier;
    const totalPayout = payout.toFixed(2);
    const winnings = (isNegativeOdds ? Math.abs(payout) : (payout - this.betAmount)).toFixed(2);
    this.winnings = `${winnings} (${totalPayout})`;
  } else {
    this.winnings = null;
  }
},
  },
  mounted() {
    this.$store.dispatch('fetchOdds')
  }
};
</script>