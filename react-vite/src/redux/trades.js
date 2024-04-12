const GET_CURRENT_USERS_TRADES = 'items/getCurrentUsersTrades'
const GET_TRADE_DETAILS = 'items/getTradeDetails'

const getCurrentUsersTrades = (currentUserTrades) => {
    return {
      type: GET_CURRENT_USERS_TRADES,
      currentUserTrades
    }
  }

const getTradeDetails = (tradeDetails) => {
    return{
        type: GET_TRADE_DETAILS,
        tradeDetails
    }
}

export const fetchGetCurrentUsersTrades = () => async (dispatch) => {
    const res = await fetch("/api/trades/current")
    if (res.ok) {
      const data = await res.json()
      dispatch(getCurrentUsersTrades(data))
      return data
    }  else if (res.status < 500) {
      const errorMessages = await res.json()
      return errorMessages
    } else {
      return { server: "Something went wrong. Please try again" }
    }
  }

export const fetchGetTradeDetails = (tradeId) => async (dispatch) => {
    const res = await fetch(`/api/trades/${tradeId}`)
    if (res.ok) {
      const data = await res.json()
      dispatch(getTradeDetails(data))
      return data
    }  else if (res.status < 500) {
      const errorMessages = await res.json()
      return errorMessages
    } else {
      return { server: "Something went wrong. Please try again" }
    }
  }

const tradesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_USERS_TRADES:
        return { ...state, currentUserTrades: action.currentUserTrades}
    case GET_TRADE_DETAILS:
        return { ...state, tradeDetails: action.tradeDetails }
    default:
      return state
  }
}

export default tradesReducer
