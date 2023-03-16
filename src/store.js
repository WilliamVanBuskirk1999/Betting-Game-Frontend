import axios from 'axios';
import { createStore } from 'vuex';
import { reactive, computed } from 'vue';

const ufcModule = {
  state: reactive({
    plusOdds: [],
    minusOdds: [],
    openBets: reactive([]),
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
    addBetToList(state, bet) {
      state.openBets = [...state.openBets, bet]
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