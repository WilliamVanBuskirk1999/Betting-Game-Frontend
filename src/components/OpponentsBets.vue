<template>
    <table id="openBets">
        <thead>
            <tr>
            <th>Player</th>
            <th>Name</th>
            <th>Bet</th>
            <th>Odds</th>
            <th>Potential Winnings</th>
            <th>Result</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(bet, i) in openBets" :key=i>
                <td>{{bet.player}}</td>
                <td>{{ bet.name }}</td>
                <td> {{ bet.bet }}</td>
                <td> {{ bet.odds }}</td>
                <td> {{ bet.payout }}</td>
                <td>{{ bet.result }}</td>
            </tr>
        </tbody>
    </table>
</template>


<script>
import io from 'socket.io-client';
const socket = io('https://betting-api.onrender.com/');

export default {
    name: 'OpponentBets',
    computed: {
        openBets() {
            return this.$store.state.ufc.opponentBets.filter(b => b.player !== this.$store.state.ufc.name);
        },
        usersBets() {
            return this.$store.state.ufc.openBets;
        },
    },
    methods: {
        refreshTable() {
            this.$forceUpdate()
        },
    },
    watch: {
        openBets() {
            this.refreshTable()
        }
    },
    mounted() {
        socket.on('betAdded', (newBet) => {
            this.$store.commit('addBetToOpponentsList', newBet)
        })
        socket.on('updateOpponentsResultsBackEnd', (bet) => {
            this.$store.commit('updateOpponentsListStore', bet)
        })
    }
}
</script>

<style scoped>
#openBets {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 80%;
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
  background-color: #E3242B;
  color: white;
}
</style>