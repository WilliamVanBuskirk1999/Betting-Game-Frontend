<template>
  <div>
    <div :hidden="hideName">
      <label for="nameLabel">Please Enter Your Name</label>
      <input type="text" v-model="name" id="nameLabel" />
      <button @click="nameAdded">Enter Name</button>
    </div>

    <div v-if="oddsDataReady" :hidden="hideGame">
      <div class="centerTextBox">
        <label for="bet" class="centerTextBox">Bet:</label>
        <input type="number" id="bet" v-model="betAmount" class="centerTextBox"/>

        <button @click="addBet">Add Bet</button>
      </div>
      <div class="wrapper">
        <div class="item1">
          <h1>Plus Odds</h1>
          <ul>
            <li v-for="odds in plusOdds" :key="odds.id">
              <label>
                <input
                  type="radio"
                  name="plus-odds"
                  :value="odds"
                  @click="selectOdds(odds.odds, odds.name)"
                />
                {{ odds.name }} - {{ odds.odds }}
              </label>
            </li>
          </ul>
        </div>

        <div class="item2">
          <h1>Minus Odds</h1>
          <ul>
            <li v-for="odds in minusOdds" :key="odds.id">
              <label>
                <input
                  type="radio"
                  name="plus-odds"
                  :value="odds"
                  @click="selectOdds(odds.odds, odds.name)"
                />
                {{ odds.name }} - {{ odds.odds }}
              </label>
            </li>
          </ul>
        </div>
      </div>

     
    </div>
  </div>
</template>

<script>
import { toRaw } from "vue";
import { mapActions } from "vuex";
import io from "socket.io-client";
const socket = io("https://betting-api.onrender.com");

export default {
  name: "OddsComponent",

  computed: {
    plusOdds() {
      return toRaw(this.$store.getters.getPlusOdds.value);
    },
    minusOdds() {
      return toRaw(this.$store.getters.getMinusOdds.value);
    },
    openBets() {
      return toRaw(this.$store.getters.getOpenBets.value);
    },
    oddsDataReady() {
      return this.plusOdds.length && this.minusOdds.length;
    },
    hideName() {
      return this.$store.state.ufc.name !== null ? true : false;
    },
    hideGame() {
      return this.$store.state.ufc.name !== null ? false : true;
    }
  },
  data() {
    return {
      selectedOdds: null,
      selectedName: null,
      betAmount: null,
      winnings: null,
      name: null
    };
  },
  methods: {
    ...mapActions(["addBetToList", "addNameToLeaderBoard","updateLeaderBoard"]),
    selectOdds(odds, name) {
      this.selectedOdds = odds;
      this.selectedName = name;
    },
    addBet() {
      if (this.selectedOdds && this.betAmount) {
        const odds = parseFloat(this.selectedOdds);
        const isNegativeOdds = odds < 0;
        const multiplier = isNegativeOdds
          ? 1 - 100 / Math.abs(odds)
          : 1 + odds / 100;
        const payout = this.betAmount * multiplier;
        const totalPayout = +payout.toFixed(2) + +this.betAmount.toFixed(2);
        const winnings = (
          isNegativeOdds ? Math.abs(payout) : payout - this.betAmount
        ).toFixed(2);
        this.winnings = `${winnings} (${totalPayout})`;

        let openBet = {
          name: this.selectedName,
          odds: odds,
          bet: this.betAmount,
          payout: totalPayout.toFixed(2),
          disabled: false,
          player: this.$store.state.ufc.name,
        };
        this.addBetToList(openBet);
        this.$store.commit("betCredits", this.betAmount);

        this.updateLeaderBoard({
          name: this.$store.state.ufc.name,
          credits: this.$store.state.ufc.credits
        })
      } else {
        this.winnings = null;
      }
    },
    nameAdded() {
      this.hideName = true;
      this.hideGame = false;
      this.$store.commit("setName", this.name);
      this.addNameToLeaderBoard({
        name: this.name,
        credits: this.$store.state.ufc.credits,
      });
    },
  },
  mounted() {
    this.$store.dispatch("fetchOdds");
    socket.on("addNameToLeaderBoard", (name) => {
      this.$store.commit("addNameToLeaderBoardStore", name);
    });
  },
};
</script>
<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
  grid-auto-rows: 100px;
  grid-template-areas:
    "a a a a b b b b"
    "a a a a b b b b";
  align-items: start;
  margin-bottom:40em
}
.item1 {
  grid-area: a;
    padding: 10px;
    border: 2px solid #000;
    border-radius: 15px;
    -moz-border-radius: 15px;
}
.item2 {
  grid-area: b;
    padding: 10px;
    border: 2px solid #000;
    border-radius: 15px;
    -moz-border-radius: 15px;
}


.centerTextBox {
  text-align:center;
}
</style>