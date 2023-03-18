<template>
    <div>
        <table id="leaderboard">
        <thead>
            <tr>
            <th>Player</th>
            <th>Credits</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(player, i) in leaderBoard" :key=i>
                <td>{{ player.name}}</td>
                <td>{{ player.credits }}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>
<script>
export default {
    name: 'Leaderboard',
    computed: {
        leaderBoard() {
            return this.$store.state.ufc.leaderBoard.slice().sort((a,b) => b.credits - a.credits);
        }
    }
}
</script>

<style scoped>
#leaderboard {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 80%;
}

#leaderboard td, #leaderboard th {
  border: 1px solid #ddd;
  padding: 8px;
}

#leaderboard tr:nth-child(even){background-color: #f2f2f2;}

#leaderboard tr:hover {background-color: #ddd;}

#leaderboard th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #ece75f;
  color: white;
}
</style>
