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

      <div v-if="winnings > 0">
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
      this.selectedOdds = +odds.substring(1);
    },
    calculateWinnings() {
      if (this.selectedOdds && this.betAmount) {
        const payout = this.selectedOdds * this.betAmount;
        this.winnings = payout.toFixed(2);
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