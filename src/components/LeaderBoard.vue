<template>
    <div>

    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'Leaderboard',
    methods: {
        ...mapActions['addNameToLeaderBoard']
    }
}
</script>

<style scoped>

</style>
