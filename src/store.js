import axios from 'axios';
import { createStore } from 'vuex';
import { reactive, computed } from 'vue';
import io from 'socket.io-client';

const socket = io('https://betting-api.onrender.com/');

const ufcModule = {
  state: reactive({
    plusOdds: [],
    minusOdds: [],
    openBets: reactive([]),
    opponentBets: reactive([]),
    leaderBoard: reactive([]),
    name: null,
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
    setName(state, name) {
      state.name = name;
    },
    setOpponentBets(state, bets) {
      state.opponentBets = bets.map((bet) => ({...bet}))
    },
    setLeaderBoard(state, names) {
      state.leaderBoard = names.map((name) => ({...name}))
    },
    addNameToLeaderBoard(state, name) {
      state.leaderBoard = [...state.leaderBoard, name]
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
        const response = await axios.get('https://betting-api.onrender.com/ufc/mybookie');
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
    },addNameToLeaderBoardStore({ commit }, name) {
      commit('addNameToLeaderBoard', name)

      socket.emit('nameAdded', name)
    }
    
    
  },
  getters: {
    getPlusOdds: (state) => computed(() => state.plusOdds),
    getMinusOdds: (state) => computed(() => state.minusOdds),
    getOpenBets: (state) => computed(() => state.openBets),
    getCredits: (state) => computed(() => Math.round(state.credits * 100) / 100),
    getLeaderBoard: (state) => computed(() => state.leaderBoard),
    getName: (state) => computed(() => state.name)
  },
};

const store = createStore({
  modules: {
    ufc: ufcModule,
  },
});

export default store;