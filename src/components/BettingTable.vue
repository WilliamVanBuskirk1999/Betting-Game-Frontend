<template>
<div>
    <h3>Potential Payout: {{this.payout}}</h3>
    <br>
    <table>
        <caption>Favorites</caption>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Odds</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(odds, i) in favoriteOdds" :key="i">
                    <td>{{odds.name}}</td>
                    <td><button @click="bet(odds.odds, odds.name)" :disabled="disableButton(odds.name)">{{odds.odds}}</button></td>
                </tr>
              </tbody>
    </table>
     <table>
        <caption>Dogs woof woof</caption>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Odds</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(odds, i) in underdogOdds" :key="i">
                    <td>{{odds.name}}</td>
                    <td><button @click="bet(odds.odds, odds.name)" :disabled="disableButton(odds.name)">{{odds.odds}}</button></td>
                </tr>
              </tbody>
    </table>
    <br/>
    </div>
</template>

<script>
import axios from 'axios'
import store from '../store'

const url = 'http://192.168.2.38:8000/ufc/mybookie'


export default {
  data() {
    return {
      favoriteOdds: [],
      underdogOdds: [],
      payout: ''
    }
  },
  created() {
    this.socket = io('http://localhost:3000'); // replace with your API URL
  },
  mounted() {
    axios.get(url).then(response => {
        let data = response.data
        this.favoriteOdds = data[1]
        this.underdogOdds = data[0]
    })
  },
  methods: {
    bet(odds) {
      this.$store.dispatch('placeBet', odds)
    },
    disableButton(name) {
      const openBets = store.state.openBets
     if (openBets.find(o => o.name === name)) {
        return true
    } else {
        return false
    }
    }
  },
  computed: {
    payoutComputed() {
      return this.payout;
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
input {
  width:80%;
  position:relative;
}

label {
  padding: 10px;
}

</style>