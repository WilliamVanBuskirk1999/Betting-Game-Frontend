import axios from 'axios';
import { createStore } from 'vuex';
import { reactive, computed } from 'vue';

const ufcModule = {
  state: reactive({
    plusOdds: [],
    minusOdds: [],
  }),
  mutations: {
    setPlusOdds(state, odds) {
      state.plusOdds = odds;
    },
    setMinusOdds(state, odds) {
      state.minusOdds = odds;
    },
  },
  actions: {
    async fetchOdds({ commit }) {
      try {
        const response = await axios.get('http://localhost:8000/ufc/mybookie');
        commit('setPlusOdds', response.data[0]);
        commit('setMinusOdds', response.data[1]);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getPlusOdds: (state) => computed(() => state.plusOdds),
    getMinusOdds: (state) => computed(() => state.minusOdds),
  },
};

const store = createStore({
  modules: {
    ufc: ufcModule,
  },
});

export default store;