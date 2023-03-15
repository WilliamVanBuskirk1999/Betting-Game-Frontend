// in your store.js file

import Vuex from 'vuex'


const store = new Vuex.Store({
  state: {
    bettingAmount: 0,
    openBets: [],
    webSocket: null
  },
  mutations: {
    SET_WEB_SOCKET(state, webSocket) {
      state.webSocket = webSocket
    },
    ADD_OPEN_BET(state, openBet) {
      state.openBets.push(openBet)
    },
    UPDATE_BETTING_AMOUNT(state, bettingAmount) {
      state.bettingAmount = bettingAmount
    },
    UPDATE_ODDS(state, odds) {
      state.odds = odds
    }
  },
  actions: {
    connectWebSocket({ commit }) {
      const webSocket = new WebSocket('ws://localhost:8000')

      webSocket.onopen = () => {
        commit('SET_WEB_SOCKET', webSocket)
      }

      webSocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        const messageType = data.type

        if (messageType === 'openBet') {
          commit('ADD_OPEN_BET', data.payload)
        } else if (messageType === 'bettingAmount') {
          commit('UPDATE_BETTING_AMOUNT', data.payload)
        } else if (messageType === 'odds') {
          commit('UPDATE_ODDS', data.payload)
        }
      }
    },
    placeBet({ state }, { betAmount, odds, name }) {
      const currentTotal = state.bettingAmount

      if (currentTotal > 0) {
        if (odds.startsWith('-')) {
          const newTotal = currentTotal - betAmount
          state.bettingAmount = Math.trunc(newTotal * 100) / 100
          const oddsToCalc = odds.substring(1)
          const unRounded = (100 / oddsToCalc) * betAmount

          const payout = Math.trunc(unRounded * 100) / 100

          const openBet = { name, bet: betAmount, payout }
          state.openBets.push(openBet)

          const webSocket = state.webSocket

          if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({ type: 'openBet', payload: openBet })
            webSocket.send(message)
          }
        } else if (odds.startsWith('+')) {
          const newTotal = currentTotal - betAmount
          state.bettingAmount = Math.trunc(newTotal * 100) / 100
          const oddsToCalc = odds.substring(1)
          const unRounded = betAmount * (oddsToCalc / 100)

          const payout = Math.trunc(unRounded * 100) / 100

          const openBet = { name, bet: betAmount, payout }
          state.openBets.push(openBet)

          const webSocket = state.webSocket

          if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({ type: 'openBet', payload: openBet })
            webSocket.send(message)
          }
        }
      }
    }
  }
})

export default store