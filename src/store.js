import axios from 'axios';
import { createStore } from 'vuex';
import { reactive, computed } from 'vue';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const ufcModule = {
  state: reactive({
    plusOdds: [],
    minusOdds: [],
    openBets: reactive([]),
    opponentBets: reactive([]),
    credits: 1000
  }),
  mutations: {
    setPlusOdds(state, odds) {
      state.plusOdds = odds;
    },
    setMinusOdds(state, odds) {
      state.minusOdds = odds;
    },
    setOpenBets(state, bets) {
      state.openBets = bets.map((bet) => ({ ...bet, disabled: false }));
    },
    setCredits(state, credits) {
      state.credits = credits;
    },
    setOpponentBets(state, bets) {
      state.opponentBets = bets.map((bet) => ({...bet}))
    },
    addBetToList(state, bet) {
      state.openBets = [...state.openBets, bet]
    },
    addBetToOpponentsList(state, bet) {
      state.opponentBets = [...state.opponentBets, bet]
    },
    addCredits(state, credit) {
      state.credits += +credit;
    },
    betCredits(state, credit) {
      state.credits -= credit;
    }
  },
  actions: {
    async fetchOdds({ commit }) {
      try {
        const response = await axios.get('http://192.168.2.38:8000/ufc/mybookie');
        commit('setPlusOdds', response.data[0]);
        commit('setMinusOdds', response.data[1]);
      } catch (error) {
        console.log(error);
      }
    },addBetToList({ commit }, newBet) {
      commit('addBetToList', newBet)

      socket.emit('newBet', newBet)
    },addBetToOpponentsList({ commit }, newBet) {
      commit('addBetToOpponentsList', newBet)
    }
    
    
  },
  getters: {
    getPlusOdds: (state) => computed(() => state.plusOdds),
    getMinusOdds: (state) => computed(() => state.minusOdds),
    getOpenBets: (state) => computed(() => state.openBets),
    getCredits: (state) => computed(() => Math.round(state.credits * 100) / 100)
  },
};

const store = createStore({
  modules: {
    ufc: ufcModule,
  },
});

export default store;