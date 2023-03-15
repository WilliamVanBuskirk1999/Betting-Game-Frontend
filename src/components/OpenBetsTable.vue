<template>
    <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>Bet</th>
            <th>Odds</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(bet, i) in openBets" :key=i>
                <td>{{ bet.name }}</td>
                <td> {{ bet.bet }}</td>
                <td> {{ bet.odds }}</td>
            </tr>
        </tbody>
    </table>
</template>


<script>
export default {
    name: 'OpenBetsTable',
    props: ['openBets']
}
</script>