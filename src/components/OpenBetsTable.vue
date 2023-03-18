<template>
    <table id="openBets">
        <thead>
            <tr>
            <th>Name</th>
            <th>Bet</th>
            <th>Odds</th>
            <th>Potential Winnings</th>
            <th></th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(bet, i) in openBets" :key=i>
                <td>{{ bet.name }}</td>
                <td> {{ bet.bet }}</td>
                <td> {{ bet.odds }}</td>
                <td> {{ bet.payout }}</td>
                <td><button @click="winBet(bet)" :disabled="bet.disabled">Win Bet</button></td>
                <td><button @click="loseBet(bet)" :disabled="bet.disabled">Lose bet :(</button></td>
            </tr>
        </tbody>
    </table>
</template>


<script>
import io from "socket.io-client";
import { mapActions } from "vuex";
const socket = io("https://betting-api.onrender.com");

export default {
    name: 'OpenBetsTable',
    computed: {
        openBets() {
            return this.$store.state.ufc.openBets;
        },
    },
    methods: {
        ...mapActions(["updateLeaderBoard", "updateOpponentsList"]),
        refreshTable() {
            this.$forceUpdate()
        },
        winBet(i) {
            this.$store.commit('addCredits', i.payout)
            this.updateLeaderBoard({ 
                name: this.$store.state.ufc.name,
                credits: this.$store.state.ufc.credits
            })
            i.disabled = true
            
        },
        loseBet(i) {
            i.disabled = true
        }
    },
    watch: {
        openBets() {
            this.refreshTable()
        }
    },
    mounted() {
        socket.on('leaderBoardUpdateBackEnd', (name) => {
            this.$store.commit('updateLeaderBoardStore', name)
        })
    }
}
</script>

<style scoped>
#openBets {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 90%;
}

#openBets td, #openBets th {
  border: 1px solid #ddd;
  padding: 8px;
}

#openBets tr:nth-child(even){background-color: #f2f2f2;}

#openBets tr:hover {background-color: #ddd;}

#openBets th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
</style>