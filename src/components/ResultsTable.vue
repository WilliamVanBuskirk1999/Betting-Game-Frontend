<template>
    <table>
        <caption>Open Bets</caption>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Bet</td>
                  <td>Potential Payout</td>
                  <td>Win</td>
                  <td>Loss</td>
                  <td>Result</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(result, i) in results" :key="i">
                    <td>{{result.name}}</td>
                    <td>{{result.bet}}</td>
                    <td>{{result.payout}}</td>
                    <td><button @click="winBet(result.payout, result.bet, i)" :disabled="result.disabled">Win</button></td>
                    <td><button @click="loseBet(i)" :disabled="result.disabled">Loss</button></td>
                    <td>{{result.result}}</td>
                </tr>
              </tbody>
    </table>
</template>

<script>
export default {
   computed: {
    results() {
        return this.$store.state.openBets
    }
   }, mounted() {
    console.log(this.$store.state.openBets)
   },
   methods: {
    winBet(payout, bet, index) {
        const win = +payout + +bet 
        let winnings = 0;
        if(!isNaN(win)) {
            winnings = this.$store.state.bettingAmount + +win
        }
        this.results[index].disabled = true
        this.results[index].result = "Win"
        this.$store.state.bettingAmount = Math.trunc(winnings*100) / 100
    },
    loseBet(index) {
        this.results[index].disabled = true
        this.results[index].result = "Loss"
    }
   }
}
</script>

<style scoped>
table {
    display: inline-block;
    padding:20px;
}

table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}

td {
    padding: 10px
}
</style>
